import "reflect-metadata";
import { IAttributeInfo } from "../interfaces";
/**
 * Saves the attributes and their initial state in the CustomComponent metadata.
 *
 * @export
 * @param {Attribute[]} attributes
 * @returns {ClassDecorator}
 */
export declare function Attributes<T extends HTMLElement>(attributes: IAttributeInfo[]): ClassDecorator;
