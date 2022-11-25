import { createNodeDescriptor } from "@cognigy/extension-tools/build";
import { getModularQuestionContext } from "../context";

export const returnNode = createNodeDescriptor({
    type: 'return',
    defaultLabel: 'Stop',
    appearance: {
        color: '#FFAABB',
        textColor: '#222222',
        variant: 'mini'
    },
    behavior: {
        stopping: true
    },
    function: async ({ cognigy }) => {
        const { context, api } = cognigy;

        const ctx = getModularQuestionContext(context);

        if (!ctx) {
            api.stopExecution!();
            throw new Error('Modular Question Context is missing!')
        }

        api.setNextNode!(ctx.questionNodeId);
        api.stopExecution!();
    }
});