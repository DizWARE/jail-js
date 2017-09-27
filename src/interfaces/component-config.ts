/**
 * Interface for options with setting up a component.
 * 
 * @export
 * @interface IComponentConfig
 */
export interface IComponentConfig {
    /**
     * The tag name used in the HTML DOM to represent this component.
     * 
     * @type {string}
     * @memberOf IComponentConfig
     */
    tagName: string,

    /**
     * The URL (local address) for the template HTML file that represents the component.
     * 
     * @type {string}
     * @memberOf IComponentConfig
     */
    templateUrl: string,

    /**
     * The URL or URLs (local address) for the style css file that represents the styling of this component.
     * 
     * @type {(string[] | string)}
     * @memberOf IComponentConfig
     */
    styleUrl?: string[] | string,

    /**
     * Additional options for the custom component.
     * 
     * @type { CustomElementOptions }
     * @memberOf IComponentConfig
     */
    options?: CustomElementOptions;
}