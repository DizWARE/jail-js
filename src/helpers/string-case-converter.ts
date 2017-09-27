/**
 * Converts a class property name to a DOM attribute name.
 * 
 * @internal
 * @export
 * @param {string} propertyName - The property name to convert to DOM attribute syntax.
 * @returns {string} - The attribute name.
 */
export function convertToKebabCase(propertyName: string) {
    return propertyName.replace(/([\w])([A-Z])/g, (match: string, prefix: string, hump: string) => {
        return `${prefix}-${hump}`;
    }).toLowerCase();
}

/**
 * Converts a DOM attribute name to a class property name.
 * 
 * @internal
 * @export
 * @param {string} attributeName - The attribute name to convert to a class property name.
 * @returns {string} - The class property name.
 */
export function convertToCamelCase(attributeName: string) {
    return attributeName.toLowerCase().replace(/([\w])-(\w)/ig, (match: string, prefix: string, hump: string) => {
        return `${prefix}${hump.toUpperCase()}`;
    });
}
