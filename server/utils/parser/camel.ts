type AnyObject = { [key: string]: unknown };

function toCamelCase(snakeCaseStr: string): string {
    return snakeCaseStr.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertKeysToCamelCase<T>(obj: AnyObject): T {
    const newObj: AnyObject = {};
    for (const key in obj) {
        if({}.propertyIsEnumerable.call(obj, key)) {
            const newKey = toCamelCase(key);
            newObj[newKey] = obj[key];
        }
    }
    return newObj as T;
}

function convertArrayKeysToCamelCase<T>(arr: AnyObject[]): T[] {
    return arr.map(obj => convertKeysToCamelCase(obj));
}

export default convertArrayKeysToCamelCase;
