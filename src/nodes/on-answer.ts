import { createNodeDescriptor } from "@cognigy/extension-tools/build";

export const onAnswer = createNodeDescriptor({
    type: 'onAnswer',
    parentType: 'modularQuestion',
    defaultLabel: 'On Answer',
    appearance: {
        color: '#FFAABB',
        textColor: '#222222',
        variant: 'mini'
    },
    constraints: {
        placement: {},
        editable: false,
        creatable: false,
        deletable: false,
        movable: false
    },
    function: async () => {}
});