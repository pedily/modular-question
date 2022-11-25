import { createNodeDescriptor } from "@cognigy/extension-tools/build";

export const onInput = createNodeDescriptor({
    type: 'onInput',
    parentType: 'modularQuestion',
    defaultLabel: 'On Input',
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