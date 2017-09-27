import "reflect-metadata";
import { IComponentConfig } from "../interfaces";
import { IElementConstructor } from "../interfaces/element-constructor";
import { ICustomComponentClass } from "../interfaces/custom-component";
import { CustomComponentMixin } from "../custom-component";
import { convertToCamelCase } from "../helpers";
import * as fs from "fs";

let loadedComponentCount = 0;

/**
 * Class decorator that will import the HTML file and the stylesheet.
 * 
 * @export
 * @param {ComponentConfig} config - The configuration for this compnent.
 * @returns {ClassDecorator}
 */
export function Component<T extends HTMLElement>(config: IComponentConfig) {
    return (element: IElementConstructor<T>): ICustomComponentClass<T> | IElementConstructor<T> => {
        if (!fs.existsSync(config.templateUrl)) {
            return element;
        }

        Reflect.defineMetadata("component:config", config, element);

        let newCtor = CustomComponentMixin(element);

        // Creates a link HTML element with the template import.
        let link = Object.assign(document.createElement("link"), {
            id: `${convertToCamelCase(config.tagName)}Template`, rel: "import", href: config.templateUrl,

            /**
             * Runs when the import is fully imported. Hooks up the stylesheet into the template and 
             * then hooks the Component functionality up with this template.
             * 
             * @param {HTMLLinkElement} this
             * @param {Event} event
             */
            onload(this: HTMLLinkElement, event: Event) {
                if (!this.import) {
                    throw new Error(`The HTML Tag ${config.tagName} had a problem importing the HTML template from ${config.templateUrl}`);
                }

                let template = this.import.querySelector("template") as HTMLTemplateElement;
                let styleUrls = typeof config.styleUrl === "string" ? [config.styleUrl] : config.styleUrl || [];

                for (let styleUrl of styleUrls) {
                    if (fs.existsSync(styleUrl)) {
                        let style = Object.assign(document.createElement("link"), {
                            rel: "stylesheet", href: styleUrl
                        });
                        template.content.insertBefore(style, template.content.firstChild);
                    }
                }

                window.customElements.define(config.tagName, newCtor, config.options);
            }
        });
        link.setAttribute("custom-component", "")
        link.setAttribute("async", "");

        document.head.appendChild(link);

        window.customElements.whenDefined(config.tagName).then(
            () => {
                // TODO - This may need a wait time to guarentee this condition. This is how the polyfill acheives this situation.

                if (document.head.querySelectorAll("link[custom-component]").length === ++loadedComponentCount) {
                    document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: true }))
                }
            }
        );

        return newCtor;
    }
}
