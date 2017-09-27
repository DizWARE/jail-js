import "reflect-metadata";
import { IComponentConfig } from "../interfaces";
/**
 * Class decorator that will import the HTML file and the stylesheet.
 *
 * @export
 * @param {ComponentConfig} config - The configuration for this compnent.
 * @returns {ClassDecorator}
 */
export declare function Component<T extends HTMLElement>(config: IComponentConfig): ClassDecorator;
