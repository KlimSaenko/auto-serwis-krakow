import constantsRaw from './constants.json';

const constants: Record<string, any> = constantsRaw;

export function getConfigConst (
    constPath: string
): { [key: string]: any } | [any] | string {
    if (!constPath) {
        throw new Error('A target constant name has to be provided.');
    }

    return constPath.split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur as keyof Record<string, any>], constants);
}