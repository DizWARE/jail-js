import "reflect-metadata";
import { convertToKebabCase } from "../helpers";

/**
 * Adds a getter and setter to the property this function wraps. The property will
 * 
 * @export
 * @param {CustomComponent} element
 * @param {string} propertyKey
 */
export function Attribute<T extends HTMLElement>(element: T, propertyKey: string) {
    let attributeName = convertToKebabCase(propertyKey);
    let propertyType = Reflect.getMetadata("design:type", element, propertyKey);

    function getter(this: T) {
        let value: string | null = this.getAttribute(attributeName) || null;

        if (value === null) {
            return defaultValue(propertyType);
        }

        value = value.trim();
        return parseValue(value, propertyType);
    }

    function setter(this: T, value: any | null) {
        if (value === null) {
            this.removeAttribute(attributeName);
        } else {
            this.setAttribute(attributeName, stringifyValue(value, propertyType));
        }
    }

    Object.defineProperty(element, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}

/**
 * Stringify the value using the property type of the property
 * 
 * @param {*} value - The value to parse.
 * @param {*} propertyType - The property type of the property being decorated.
 * @returns The string representation of the given value.
 */
function stringifyValue(value: any, propertyType: any) {
    switch (propertyType) {
        case Number:
        case Boolean:
        case String:
        case Date:
        case RegExp:
        case Array:
            return `${value}`;
        default:
            throw new Error(`${propertyType} cannot be properly serialized into a DOM attribute`);
    }
}

/**
 * Parse the value from a string to the property type of this property.
 * 
 * @param {string} value - The value to parse.
 * @param {*} propertyType - The property type of the property being decorated.
 * @returns The parsed value of the given string.
 */
function parseValue(value: string, propertyType: any) {
    switch (propertyType) {
        case Number:
            return Number.parseFloat(value);
        case Boolean:
            return value.toLowerCase() === "true" || value === "";
        case String:
            return value;
        case Date:
            return new Date(value);
        case Array:
            return value.split(",");
        case RegExp:
            return new RegExp(value);
        default:
            throw new Error(`${propertyType} is too complex and cannot be unnserialized from a DOM attribute.`)
    }
}

/**
 * Gets a default value for the given property type.
 * 
 * @param {any} propertyType - The property type of the property being decorated.
 * @returns The default value of the property type.
 */
function defaultValue(propertyType) {
    switch (propertyType) {
        case Number:
            return 0;
        case Boolean:
            return false;
        case Array:
            return [];
        default:
            return null;
    }
}