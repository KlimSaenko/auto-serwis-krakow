import constansRaw from '../../config/constans.json';

const constans: Record<string, any> = constansRaw;

export function getConfigConst (
    constPath: string
): { [key: string]: any } | [any] | string {
    if (!constPath) {
        throw new Error('A target constant name has to be provided.');
    }

    return constPath.split('.')
        .filter(t => t !== '')
        .reduce((prev, cur) => prev && prev[cur as keyof Record<string, any>], constans);
}