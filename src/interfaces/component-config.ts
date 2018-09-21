/// <reference path="../../global.d.ts" />

/**
 * Interface for options with setting up a component.
 * 
 * @export
 * @interface IComponentConfig
 */
interface _IComponentConfig  {
    /**
     * The tag name used in the HTML DOM to represent this component.
     * 
     * @type {string}
     * @memberOf IComponentConfig
     */
    tagName: string;

    /**
     * HTML Template of the component.
     *
     * @type {string}
     * @memberof IComponentConfig
     */
    template?: string;

    /**
     * The URL (local address) for the template HTML file that represents the component.
     * 
     * @type {string}
     * @memberOf IComponentConfig
     */
    templateUrl?: string;

    /**
     * Style that will be injected into the component.
     *
     * @type {string}
     * @memberof IComponentConfig
     */
    style?: string;

    /**
     * The URL or URLs (local address) for the style css file that represents the styling of this component.
     * 
     * @type {(string[] | string)}
     * @memberOf IComponentConfig
     */
    styleUrl?: string[] | string;

    /**
     * Additional options for the custom component.
     * 
     * @type { CustomElementOptions }
     * @memberOf IComponentConfig
     */
    options?: CustomElementOptions;
}

export type IComponentConfig = (
    _IComponentConfig & { templateUrl: string, template?: undefined }
 ) | (
    _IComponentConfig & { template: string, templateUrl?: undefined }
);