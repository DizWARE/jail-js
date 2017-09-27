import { QuerySelectorLocation as Location } from "../enumerations";
/**
 * Converts the decorated property into a getter, that retrieves the child element matching the selector from the DOM.
 *
 * Its important to stress, this will not break through child shadow DOMs. Attempting to access a child components' child will have to go through the child component.
 *
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {string} selector - The DOM selector to use to find the child element.
 * @param {Location} [location=Location.attachedOnly] - Whether to search for attached only, detached only, or both.
 * @returns {PropertyDecorator}
 */
export declare function QuerySelector<T extends HTMLElement>(selector: string, location?: Location): PropertyDecorator;
/**
 * Converts the decorated property into a getter, that retrieves child elements matching the selector from the DOM.
 *
 * Its important to stress, this will not break through child shadow DOMs. Attempting to access a child components' child will have to go through the child component.
 *
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {string} selector - The DOM selector to use to find the child elements.
 * @param {Location} [location=Location.attachedOnly] - Whether to search for attached only, detached only, or both.
 * @returns {PropertyDecorator}
 */
export declare function QuerySelectorAll<T extends HTMLElement>(selector: string, location?: Location): PropertyDecorator;
/**
 * Converts the decorated property to a getter that retreives the parent component of this element.
 *
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export declare function ParentComponent<T extends HTMLElement>(element: T, propertyKey: string): void;
/**
 * Converts the decorated property to a getter that retreives the next sibling element for this element.
 *
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export declare function NextSibling<T extends HTMLElement>(element: T, propertyKey: string): void;
/**
 * Converts the decorated property to a getter that retreives the previous sibling element for this element.
 *
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export declare function PreviousSibling<T extends HTMLElement>(element: T, propertyKey: string): void;
