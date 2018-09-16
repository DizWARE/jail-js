interface CustomElementOptions {
    /**
     * String specifying the name of a built-in element to extend. Used to create a customized built-in element.
     */
    extends: string;
}

interface CustomElementRegistry {
    /**
     * Defines a new custom element.
     * 
     * @param {string} name - Name for the new custom element.
     * @param {Function} constructor - Constructor for the new custom element.
     * @param {CustomElementOptions} [options] - Object that controls how the element is defined.
     */
    define(name: string, constructor: Function, options?: CustomElementOptions): void;

    /**
     * Returns the constructor for the named custom element, or undefined if the custom element is not defined.
     * 
     * @param {string} name - Custom element name.
     * @returns {Function} - The constructor for the named custom element, or undefined if there is no custom element definition for the name.
     */
    get(name: string): Function;

    /**
     * Returns a promise that will be fulfilled when a custom element becomes defined with the given name. 
     * (If such a custom element is already defined, the returned promise is immediately fulfilled.)
     * 
     * @param {string} name - Custom element name.
     * @returns {Promise<void>} - A Promise that resolves when the custom element is defined. If the custom element is already defined, the promise is resolved immediately.
     */
    whenDefined(name: string): Promise<void>;
}

interface Window {
    /**
     * Registry of all registered custom elements.
     */
    customElements: CustomElementRegistry;
}

declare enum ShadowRootMode { "open", "closed" }

interface ShadowRoot extends DocumentFragment {
    readonly mode: ShadowRootMode;
    readonly host: Element;
}

interface DocumentFragment extends Node {
}

interface Node {
    /**
     * Gets the parent component of this element. This will go through any layers of HTML and shadow DOM to the next web component.
     */
    getRootNode(): ShadowRoot;
}

interface Document {
    createElement(tagName: string, options: { is: string });
}

declare var window: Window;