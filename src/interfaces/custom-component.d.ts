/**
 * Interface representing the class and its static properties of a custom component.
 *
 * @export
 * @interface ICustomComponentClass
 * @template T
 */
export interface ICustomComponentClass<T extends HTMLElement> {
    /**
     * Creates a typing that represents a mixin generator. Type U is a child of type T, which is the original
     * class. The constructor creates a U type that injects the ICustomComponent functionality.
     *
     * This is pretty complicated syntax sugar, but it properly declares the typings of the constructor that is generated.
     */
    new <U extends T & ICustomComponent>(...args: any[]): U;
    /**
     * A static property for accessing the attributes that are currently watched by a component.
     *
     * @type {string[]}
     * @memberOf ICustomComponentClass
     */
    observedAttributes: string[];
    /**
     * A static property for accessing the declared tag name of this component.
     *
     * @type {string[]}
     * @memberOf ICustomComponentClass
     */
    tagName: string;
}
/**
 * Interface representing a custom component type.
 *
 * @export
 * @interface ICustomComponent
 * @extends {HTMLElement}
 */
export interface ICustomComponent extends HTMLElement {
}
