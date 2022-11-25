const INPUT_RESULT_KEY = '_modularQuestionResult';

export const acceptQuestionResult = (input: any, result: any) => input[INPUT_RESULT_KEY] = result;
export const getQuestionResult = (input: any) => input[INPUT_RESULT_KEY];