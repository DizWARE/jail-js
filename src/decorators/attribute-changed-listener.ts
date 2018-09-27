import "reflect-metadata";
import { convertToKebabCase } from "../helpers";

/**
 * Defines the method being decorated as a listener for changes to the given list of attributes.
 * 
 * @export
 * @template T - Class being decorated. This should enforce that the type is at least an HTMLElement.
 * @param {string[]} attributeNames - The name of the attributes to watch for changes. When a change happens, this method is called.
 */
export function AttributeChangedListener<T extends HTMLElement>(...attributeNames: string[]): MethodDecorator {
    return function (element: T, methodName: string, descriptor: PropertyDescriptor) {
        attributeNames = [...new Set(attributeNames)];

        for (let attributeName of attributeNames) {
            attributeName = convertToKebabCase(attributeName);
            let attributeListeners = Reflect.getMetadata("component:attribute-listeners", element.constructor) || {};
            attributeListeners[attributeName] = [...(attributeListeners[attributeName] || []), element[methodName]]

            Reflect.defineMetadata("component:attribute-listeners", attributeListeners, element.constructor)
        }
    }
}