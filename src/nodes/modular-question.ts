import { createNodeDescriptor } from "@cognigy/extension-tools/build";
import { TNodeChildConfigs } from "@cognigy/extension-tools/build/interfaces/descriptor";
import { clearModularQuestionContext, getModularQuestionContext, initializeModularQuestionContext, setModularQuestionContext } from "../context";
import { getQuestionResult } from "../result";

const getPromptConfig = (childConfigs: TNodeChildConfigs[]) => childConfigs.find(config => config.type === 'onPrompt');
const getInputConfig = (childConfigs: TNodeChildConfigs[]) => childConfigs.find(config => config.type === 'onInput');
const getAnswerConfig = (childConfigs: TNodeChildConfigs[]) => childConfigs.find(config => config.type === 'onAnswer');


export const modularQuestion = createNodeDescriptor({
    type: 'modularQuestion',
    defaultLabel: 'Modular Question',
    summary: 'Asks a Question using Flow Logic for sending Prompts and Input validation.',
    appearance: {
        color: '#FFAABB',
        textColor: '#222222',
        showIcon: false,
        variant: 'hexagon'
    },
    behavior: {
        entrypoint: true
    },
    constraints: {
        placement: {
            children: {
                whitelist: ['onPrompt', 'onInput', 'onAnswer']
            }
        },
        collapsable: true
    },
    function: async ({ cognigy, childConfigs, nodeId }) => {
        const { input, context, api } = cognigy;

        const modularQuestionContext = getModularQuestionContext(context);

        
        /**
         * If this is the first execution,
         * initialize the context values and follow the "prompt" hook
         */
        const isFirstExecution = !modularQuestionContext;
        if (isFirstExecution) {
            initializeModularQuestionContext(context, nodeId);
            const promptConfig = getPromptConfig(childConfigs);

            if (promptConfig) {
                api.setNextNode!(promptConfig.id);
            } else {
                throw new Error("No 'On Prompt' Child Node found!")
            }

            return;
        }

        api.resetExecutionAmount!(nodeId);
        
        /**
         * If we "accepted" a result from an "on input" hook,
         * we're cleaning up the question context, then 
         * we continue with the "on answer" hook (if present)
         * and we're done :)
         */
        const result = getQuestionResult(input);
        if (result !== undefined) {
            clearModularQuestionContext(context);

            const answerConfig = getAnswerConfig(childConfigs);

            if (answerConfig) {
                api.setNextNode!(answerConfig.id);
            } else {
                // continues to the successor of the "question node"
                return;
            }

            return;
        }

        /**
         * We're dealing with a "question input",
         * so we follow the "on input" hook and wait for
         * an "accepted result" or a "rejection"
         */
        setModularQuestionContext(context, {
            ...modularQuestionContext,
            inputCount: modularQuestionContext.inputCount + 1
        });

        const inputConfig = getInputConfig(childConfigs);

        if (inputConfig) {
            api.setNextNode!(inputConfig.id);
        } else {
            throw new Error("No 'On Input' Child Node found!");
        }
    }
});