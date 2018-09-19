/// <reference path="../global.d.ts" />

import { convertToCamelCase } from "./helpers";
import { IAttributeInfo, IComponentConfig } from "./interfaces";
import { ICustomComponent, ICustomComponentClass } from "./interfaces/custom-component";
import { IElementConstructor } from "./interfaces/element-constructor";
import { extendsCustomComponent } from "./typeguards/custom-component";
import { implementsOnAdopted, implementsOnAttributeChanged, implementsOnConnected, implementsOnDisconnected, implementsAttachChildren } from "./typeguards/component-listeners";

/**
 * A promise used to wait for all components that are loaded in the application to be ready.
 */
const webComponentsReady = new Promise<void>((resolve, reject) => {
    setTimeout(() => {
        reject("All components did not load in a reasonable timeframe.")
    }, 3000);
    document.addEventListener("WebComponentsReady", () => {
        resolve();
    });
});


/**
 * Mixin for injecting custom component functionality into a class that inherits from HTMLElement.
 * 
 * @export
 * @template T
 * @param {new (...args: any[]) => HTMLElement} element
 * @returns {ICustomComponentClass<T>}
 * @internal
 */
export function CustomComponentMixin<T extends HTMLElement, U extends IElementConstructor<HTMLElement>>(element: U): ICustomComponentClass<T> {
    return class CustomComponent extends element implements ICustomComponent {

        /**
         * List of non-direct component descendants.
         * 
         * @private
         * @type {CustomComponent[]}
         * @memberOf CustomComponent
         * @internal
         */
        private _child: CustomComponent[] = [];

        /**
         * Returns a list of CustomComponent children that can then be accessed by index.
         * 
         * this.$Child[3] === 4th component child.
         * 
         * @readonly
         * @protected
         * @type {CustomComponent[]}
         * @memberOf CustomComponent
         * @internal
         */
        public get $Child(): CustomComponent[] {
            let directChildren = Array.from(this.shadowRoot.children || []).filter(value => value.shadowRoot) as CustomComponent[];

            return this._child.concat(directChildren);
        }

        /**
         * Returns this parent component.
         * 
         * @readonly
         * @protected
         * @type {CustomComponent}
         * @memberOf CustomComponent
         * @internal
         */
        public get $Parent(): CustomComponent {
            if (this.parentElement && extendsCustomComponent(this.parentElement)) {
                return this.parentElement as CustomComponent;
            }

            return (this.getRootNode().host || document.body) as CustomComponent;
        }

        /**
         * Returns this component. Can be used to access data in this component.
         * 
         * @readonly
         * @protected
         * @type {this}
         * @memberOf CustomComponent
         * @internal
         */
        public get $Self(): this {
            return this;
        }

        /**
         * Metadata for constructing this component.
         * 
         * @protected
         * @type {ComponentConfig}
         * @memberOf CustomComponent
         */
        protected config: IComponentConfig;

        /**
         * Gets the shadow root of this element.
         * 
         * @override - Overrides the shadow root call so that an error is thrown if the component doesn't have a shadow root or is not connected
         */
        public get shadowRoot(): ShadowRoot {
            let shadowRoot = super.shadowRoot;
            if (!shadowRoot) {
                throw new Error("Shadow root does not exist on this component.")
            }

            return shadowRoot;
        }

        /**
         * The observed attributes for this Custom HTML Element. This will make it possible to watch for 
         * changes on attributes on the DOM Element.
         * 
         * @readonly
         * @static
         * 
         * @memberOf CustomComponent
         * @internal
         */
        public static get observedAttributes(): string[] {
            let metadata = Reflect.getMetadata("component:attributes", this) as IAttributeInfo[];

            return metadata ? metadata.map(value => value.name) : [];
        }

        /**
         * Gets the tag name for this component.
         * 
         * @readonly
         * @static
         * 
         * @memberOf CustomComponent
         */
        public static get tagName() {
            let config = Reflect.getMetadata("component:config", this) as IComponentConfig;

            return config.tagName;
        }

        /**
         * Creates an instance of CustomComponent.
         * 
         * 
         * @memberOf CustomComponent
         */
        constructor(...args: any[]) {
            super(...args);

            this.config = Reflect.getMetadata("component:config", this.constructor);

            this.connectedCallback = this.connectedCallback.bind(this);
            this.disconnectedCallback = this.disconnectedCallback.bind(this);
            this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
            this.adoptedCallback = this.adoptedCallback.bind(this);

            this.attachShadow({ mode: "open" });

            this._initializeView();
            this._loadInitialState();
        }

        /**
         * Links the HTML Template and the component styling with the functionality of the web component.
         * 
         * 
         * @memberOf CustomComponent
         * @internal
         */
        public async connectedCallback(): Promise<void> {
            await webComponentsReady;

            this._attachChildren();

            if (extendsCustomComponent(this.$Parent) && this.$Parent.$Child.indexOf(this) < 0) {
                this.$Parent.addIndirectChild(this)
            }

            if (implementsOnConnected(this)) {
                this.onConnected();
            }
        }

        /**
         * Disconnects the functionality of this component from the DOM when the element is removed.
         * 
         * 
         * @memberOf CustomComponent
         * @internal
         */
        public async disconnectedCallback(): Promise<void> {
            await webComponentsReady;

            this._detatchChildren();

            if (extendsCustomComponent(this.$Parent)) {
                this.$Parent.removeIndirectChild(this);
            }

            if (implementsOnDisconnected(this)) {
                this.onDisconnected();
            }
        }

        /**
         * When an attribute, that are explicitly set to be watched using the {@link Attributes} decorator, changes this callback is called.
         * 
         * @param {string} [attrName] - Name of the attribute that is changing.
         * @param {string} [oldVal] - The original value.
         * @param {string} [newVal] - The new value.
         * 
         * @memberOf CustomComponent
         * @internal
         */
        public async attributeChangedCallback(attrName?: string, oldVal?: string, newVal?: string): Promise<void> {
            await webComponentsReady;

            let attributeChangedListeners: { [key: string]: ((oldVal?: string, newVal?: string) => void)[] }
                = Reflect.getMetadata("component:attribute-listeners", this.constructor) || [];

            if (attrName && (attributeChangedListeners[attrName] || []).length) {
                attributeChangedListeners[attrName].forEach(value => value.bind(this)(oldVal, newVal));
            }

            if (implementsOnAttributeChanged(this)) {
                this.onAttributeChanged(attrName, oldVal, newVal);
            }
        }

        /**
         * When this custom element is adopted into a new document, this callback is called.
         * 
         * 
         * @memberOf CustomComponent
         * @internal
         */
        public async adoptedCallback(): Promise<void> {
            await webComponentsReady;

            this._attachChildren();

            if (extendsCustomComponent(this.$Parent) && this.$Parent.$Child.indexOf(this) < 0) {
                this.$Parent.addIndirectChild(this)
            }

            if (implementsOnAdopted(this)) {
                this.onAdopted();
            }
        }

        /**
         * Validates that the given custom component is an indirect child.
         * 
         * @param {CustomComponent} child 
         * @returns - True if the child is an indirect child. False otherwise.
         */
        public isIndirectChild(child: CustomComponent) {
            return this._child.indexOf(child) >= 0;
        }

        /**
         * Removes an indirect child from its parent.
         * 
         * @param {CustomComponent} child 
         */
        public removeIndirectChild(child: CustomComponent) {
            if (this.isIndirectChild(child)) {
                this._child.splice(this._child.indexOf(child), 1);
            }
        }

        /**
         * Adds an indirect child of this parent. This allows components to directly link themselves even if they are deep within regular HTMLElements.
         * 
         * @param {CustomComponent} child 
         */
        public addIndirectChild(child: CustomComponent) {
            this._child.push(child);
        }


        /**
         * Handles attaching the children to the Shadow DOM. The default implementation will append the children into the Shadow DOM.
         * 
         * @private
         */
        private _attachChildren() {
            if (implementsAttachChildren(this)) {
                this.attachChildren();
            } else {
                Array.from(this.childNodes).forEach(value => this.shadowRoot.appendChild(value));
            }
        }

        /**
         * Handles detatching the children from the component from the Shadow DOM. The default implementation will move the children out of the Shadow DOM.
         * 
         * @private
         */
        private _detatchChildren() {
            if (implementsAttachChildren(this)) {
                this.detachChildren();
            } else {
                Array.from(this.shadowRoot.childNodes).forEach(value => this.appendChild(value));
            }
        }

        /**
         * Gathers the attributes that have been set up using the {@link Attributes} decorator, and sets the initial state for this component.
         * If values were set in the HTML, the initial state and those values are compared; If different the attributeChangedCallback is called.
         * 
         * @private
         * 
         * @memberOf CustomComponent
         */
        private _loadInitialState() {
            let initialState: IAttributeInfo[] = Reflect.getMetadata("component:attributes", this.constructor) || [];

            for (let {name, value} of initialState) {
                let currentValue = this.getAttribute(name);

                if (!value || (value && currentValue && value !== currentValue)) {
                    continue;
                }

                this.setAttribute(name, `${value}`);
            }
        }

        /**
         * Initializies the view for this component by loading the coorisponding template.
         * 
         * @private
         * 
         * @memberOf CustomComponent
         */
        private _initializeView() {
            // Load template into the HTMLElement
            let importElement = document.getElementById(`${convertToCamelCase(this.config.tagName)}Template`) as HTMLLinkElement;

            if (!importElement || !importElement.import) {
                return;
            }

            let template = importElement.import.querySelector(`template`) as HTMLTemplateElement;

            if (!template) {
                return;
            }

            let instance = template.content.cloneNode(true);

            this.shadowRoot.appendChild(instance);
        }
    } as ICustomComponentClass<T>;
}
