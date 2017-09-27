/**
 * Interface representing the constructor of a class that extends HTMLElement.
 *
 * @interface IElementConstructor
 * @template T - The class being constructed.
 */
export interface IElementConstructor<T extends HTMLElement> {
    new (...args: any[]): T;
}
