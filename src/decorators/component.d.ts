import "reflect-metadata";
import { IComponentConfig } from "../interfaces";
import { IElementConstructor } from "../interfaces/element-constructor";
import { ICustomComponentClass } from "../interfaces/custom-component";
/**
 * Class decorator that will import the HTML file and the stylesheet.
 *
 * @export
 * @param {ComponentConfig} config - The configuration for this compnent.
 * @returns {ClassDecorator}
 */
export declare function Component<T extends HTMLElement>(config: IComponentConfig): (element: IElementConstructor<T>) => IElementConstructor<T> | ICustomComponentClass<T>;
