import { createNodeDescriptor } from "@cognigy/extension-tools/build";
import { getModularQuestionContext } from "../context";
import { acceptQuestionResult } from "../result";

interface IAcceptConfig {
    location: 'input' | 'context';
    path: string;
}

export const accept = createNodeDescriptor({
    type: 'accept',
    defaultLabel: 'Accept Answer',
    appearance: {
        color: '#FFAABB',
        textColor: '#222222',
        showIcon: false
    },
    behavior: {
        stopping: true
    },
    fields: [
        {
            type: 'select',
            key: 'location',
            label: 'Result Location',
            params: {
                options: [
                    {
                        label: 'Input',
                        value: 'input'
                    },
                    {
                        label: 'Context',
                        value: 'context'
                    }
                ]
            },
            defaultValue: 'input'
        },
        {
            type: 'text',
            key: 'path',
            label: 'Result Path in Location',
            description: 'Tells the Question Node where to look for the Result'
        }
    ],
    preview: {
        type: 'text',
        key: 'path'
    },
    function: async ({ cognigy, config: _untypedConfig }) => {
        const { api, input, context } = cognigy;
        const config = _untypedConfig as IAcceptConfig;

        const modularQuestionContext = getModularQuestionContext(context);

        if (!modularQuestionContext?.questionNodeId) {
            throw new Error("Could not resolve modular question context! Are we inside of a Question?");
        }

        const result = (() => {
            try {
            const location = (() => {
                switch (config.location) {
                    case "context":
                        return context;
    
                    case "input":
                        return input;
                }
            })();
    
            return location[config.path];
        } catch {
            throw new Error(`Could not resolve question result at '${config.location}.${config.path}'`);
        }
        })(); 

        acceptQuestionResult(input, result);
        api.setNextNode!(modularQuestionContext.questionNodeId);
    }
});