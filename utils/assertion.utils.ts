
export function hasDuplicates(array: any[]): boolean {
    return new Set(array).size !== array.length;
}