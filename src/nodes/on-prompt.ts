import { createNodeDescriptor } from "@cognigy/extension-tools/build";

export const onPrompt = createNodeDescriptor({
    type: 'onPrompt',
    parentType: 'modularQuestion',
    defaultLabel: 'On Prompt',
    appearance: {
        color: '#FFAABB',
        textColor: '#222222',
        variant: 'mini'
    },
    constraints: {
        placement: {},
        editable: false,
        deletable: false,
        creatable: false,
        movable: false,
    },
    function: async () => {}
});