import "reflect-metadata";
import { IAttributeInfo } from "../interfaces";
import { IElementConstructor } from "../interfaces/element-constructor";
/**
 * Saves the attributes and their initial state in the CustomComponent metadata.
 *
 * @export
 * @param {Attribute[]} attributes
 * @returns {ClassDecorator}
 */
export declare function Attributes<T extends HTMLElement>(attributes: IAttributeInfo[]): (element: IElementConstructor<T>) => void;
