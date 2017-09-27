import { Component, Attribute, Attributes, AttributeChangedListener } from "jail-js/decorators";
import { isElseBlock } from "./typeguards";

/**
 * Represents an IF block in the HTML Document. If the conditional is true, it will render the elements in its DOM tree. Otherwise, nothing is rendered.
 * 
 * @export
 * @class If
 * @extends {CustomComponent}
 */
@Component({
    tagName: "if-block",
    templateUrl: `${__dirname}/if-block.html`
})
@Attributes([{ name: "conditional" }])
export class If extends HTMLElement {

    /**
     * The conditional for the if statement. 
     * 
     * @private
     * @type {boolean}
     * @memberOf If
     */
    @Attribute protected conditional: boolean;

    /**
     * Creates an instance of If.
     * 
     * 
     * @memberOf If
     */
    constructor() {
        super();
    }

    /**
     * Executes the full If-Else block. If the conditional passes, the IF will render its children; Otherwise it will be hidden.
     * 
     * All the Else bloocks will then be processed.
     * 
     * 
     * @memberOf If
     */
    execute() {
        if (this.conditional) {
            Array.from(this.children).forEach(value => this.shadowRoot!.appendChild(value));
        } else {
            Array.from(this.shadowRoot!.children).forEach(value => this.appendChild(value));
        }

        let elseBlock = this.nextElementSibling as HTMLElement;
        let result = this.conditional;

        while (isElseBlock(elseBlock)) {
            result = elseBlock.execute(result);
            elseBlock = elseBlock.nextElementSibling as HTMLElement;
        }
    }

    /**
     * Event handler for when the conditional value is changed.
     * 
     * 
     * @memberOf If
     */
    @AttributeChangedListener("conditional")
    onConditionalChanged() {
        this.execute();
    }
}