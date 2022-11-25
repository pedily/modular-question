const CONTEXT_KEY = `_modularQuestion`;

export interface IModularQuestionContext {
    questionNodeId: string;
    inputCount: number;
}

export const getModularQuestionContext = (context: any): IModularQuestionContext | undefined => context[CONTEXT_KEY];
export const setModularQuestionContext = (context: any, value: IModularQuestionContext) => context[CONTEXT_KEY] = value;
export const initializeModularQuestionContext = (context: any, nodeId: string) => setModularQuestionContext(context, {
    questionNodeId: nodeId,
    inputCount: 0
});
export const clearModularQuestionContext = (context: any) => delete context[CONTEXT_KEY];
