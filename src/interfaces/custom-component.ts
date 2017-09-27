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
    /**
     * Pointer to the children of this component.
     * 
     * @type {ICustomComponent[]}
     * @memberOf ICustomComponent
     * @internal
     */
    $Child: ICustomComponent[];

    /**
     * Pointer to the parent of this component.
     * 
     * @type {ICustomComponent}
     * @memberOf ICustomComponent
     * @internal
     */
    $Parent: ICustomComponent;

    /**
     * Pointer to this component.
     * 
     * @type {this}
     * @memberOf ICustomComponent
     * @internal
     */
    $Self: this;

    /**
     * Callback for when a component is connected.
     * 
     * @type {Promise<void>}
     * @memberOf ICustomComponent
     * @internal
     */
    connectedCallback(): Promise<void>;

    /**
     * Callback for when a component is disconnected.
     * 
     * @type {Promise<void>}
     * @memberOf ICustomComponent
     * @internal
     */
    disconnectedCallback(): Promise<void>;

    /**
     * Callback for when a component attribute that is watched, has changed.
     * 
     * @type {Promise<void>}
     * @memberOf ICustomComponent
     * @internal
     */
    attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): Promise<void>;

    /**
     * Callback for when a component is adopted.
     * 
     * @type {Promise<void>}
     * @memberOf ICustomComponent
     * @internal
     */
    adoptedCallback(): Promise<void>
}