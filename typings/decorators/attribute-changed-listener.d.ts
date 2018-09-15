import "reflect-metadata";
/**
 * Defines the method being decorated as a listener for changes to the given attribute.
 *
 * @export
 * @template T - Class being decorated. This should enforce that the type is at least an HTMLElement.
 * @param {string} attributeName - The name of the attribute to watch for changes. When a change happens, this method is called.
 */
export declare function AttributeChangedListener<T extends HTMLElement>(attributeName: string): MethodDecorator;
/**
 * Defines the method being decorated as a listener for changes to the given list of attributes.
 *
 * @export
 * @template T - Class being decorated. This should enforce that the type is at least an HTMLElement.
 * @param {string[]} attributeNames - The name of the attributes to watch for changes. When a change happens, this method is called.
 */
export declare function AttributeChangedListener<T extends HTMLElement>(...attributeNames: string[]): MethodDecorator;
