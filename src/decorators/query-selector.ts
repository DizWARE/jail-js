import { QuerySelectorLocation as Location } from "../enumerations";
import { ICustomComponent } from "../interfaces/custom-component"

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
export function QuerySelector<T extends HTMLElement>(selector: string, location: Location = Location.attachedOnly): PropertyDecorator {
    return function (element: T, propertyKey: string) {
        function getter(this: T) {
            return (location & Location.attachedOnly && this.shadowRoot!.querySelector(selector)) ||
                (location & Location.detachedOnly && this.querySelector(selector)) || null;
        }

        Object.defineProperty(element, propertyKey, {
            get: getter,
            enumerable: true,
            configurable: true
        });
    }
}

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
export function QuerySelectorAll<T extends HTMLElement>(selector: string, location: Location = Location.attachedOnly): PropertyDecorator {
    return function (element: T, propertyKey: string) {
        let propertyType = Reflect.getMetadata("design:type", element, propertyKey);

        function getter(this: T) {
            if (propertyType !== Array) {
                return null;
            }

            let elements: Element[] = [
                ...((location & Location.attachedOnly && Array.from(this.shadowRoot!.querySelectorAll(selector))) || []),
                ...((location & Location.detachedOnly && Array.from(this.querySelectorAll(selector))) || [])
            ];

            return elements
        }

        Object.defineProperty(element, propertyKey, {
            get: getter,
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * Converts the decorated property to a getter that retreives the parent component of this element.
 * 
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export function ParentComponent<T extends HTMLElement>(element: T, propertyKey: string) {
    function getter(this: ICustomComponent) {
        return this.$Parent;
    }

    Object.defineProperty(element, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true
    })
}

/**
 * Converts the decorated property to a getter that retreives the next sibling element for this element.
 * 
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export function NextSibling<T extends HTMLElement>(element: T, propertyKey: string) {
    function getter(this: T) {
        return this.nextElementSibling;
    }

    Object.defineProperty(element, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true
    })
}

/**
 * Converts the decorated property to a getter that retreives the previous sibling element for this element.
 * 
 * @export
 * @template T - An Custom Component type containing this property.
 * @param {T} element - The element containing this property.
 * @param {string} propertyKey - The property being decorated.
 */
export function PreviousSibling<T extends HTMLElement>(element: T, propertyKey: string) {
    function getter(this: T) {
        return this.previousElementSibling;
    }

    Object.defineProperty(element, propertyKey, {
        get: getter,
        enumerable: true,
        configurable: true
    })
}