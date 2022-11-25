import { createExtension } from "@cognigy/extension-tools/build";

import { accept } from "./nodes/accept";
import { returnNode } from "./nodes/return";
import { modularQuestion } from "./nodes/modular-question";
import { onAnswer } from "./nodes/on-answer";
import { onInput } from "./nodes/on-input";
import { onPrompt } from "./nodes/on-prompt";

export default createExtension({
    nodes: [
        modularQuestion,
        onPrompt,
        onInput,
        onAnswer,
        returnNode,
        accept,
    ],
    options: {
        label: 'Modular Question'
    }
})