import "reflect-metadata";
import { IComponentConfig } from "../interfaces";
import { IElementConstructor } from "../interfaces/element-constructor";
import { ICustomComponentClass } from "../interfaces/custom-component";
import { CustomComponentMixin } from "../custom-component";
import { convertToCamelCase, addTemplateTag, convertToDataUrl, addStyleTag, minimizeHtml, isDataUrl, getFacadeUrl } from "../helpers";

let loadedComponentCount = 0;

/**
 * Class decorator that will import the HTML file and the stylesheet.
 * 
 * @export
 * @param {ComponentConfig} config - The configuration for this compnent.
 * @returns {ClassDecorator}
 */
export function Component<T extends HTMLElement>(config: IComponentConfig): (element: IElementConstructor<T>) => ICustomComponentClass<T> {
    return (element: IElementConstructor<T>): ICustomComponentClass<T> => {
        Reflect.defineMetadata("component:config", config, element);

        let newCtor = CustomComponentMixin<T, IElementConstructor<T>>(element);

        const template = config.template && config.template.length && convertToDataUrl(
            minimizeHtml(
                addTemplateTag(config.template, config.tagName)
            ), "text/html"
        );        

        // Creates a link HTML element with the template import.
        let link = Object.assign(document.createElement("link"), {
            id: `${convertToCamelCase(config.tagName)}Template`, rel: "import", 
            href: config.templateUrl ? config.templateUrl : template,

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

                const template = this.import.querySelector("template") as HTMLTemplateElement;
                const styleUrls = typeof config.styleUrl === "string" ? [config.styleUrl] : config.styleUrl || [];

                if (isDataUrl(this.href)) {
                    this.href = getFacadeUrl(config.tagName, "template");
                }

                if (config.style && config.style.length) {
                    template.innerHTML = addStyleTag(config.style) + template.innerHTML;
                }

                for (let styleUrl of styleUrls) {
                    let style = Object.assign(document.createElement("link"), {
                        rel: "stylesheet", href: styleUrl,
                        onload(this: HTMLLinkElement) {
                            if (isDataUrl(this.href)) {
                                this.href = getFacadeUrl(config.tagName, "css");
                            }
                        }
                    });
                    template.content.insertBefore(style, template.content.firstChild);
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
