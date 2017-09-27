import { Component, Attribute, Attributes, AttributeChangedListener } from "web-component-library/decorators";
import { If } from "../if-block";
import { isIfBlock, isElseBlock } from "../typeguards"
import { IAttachChildren } from "web-component-library/interfaces";

/**
 * Represents an Else block in the HTML Document. It is activated within an If block. If the if fails, it run through any else blocks that are within the if statement.
 * 
 * @export
 * @class Else
 * @extends {CustomComponent}
 * @implements {IOnConnected}
 */
@Component({
    tagName: "else-block",
    templateUrl: `${__dirname}/else-block.html`
})
@Attributes([{ name: "conditional", value: true }])
export class Else extends HTMLElement implements IAttachChildren {

    /**
     * Stores the parent IF block.
     * 
     * @type {If}
     * @memberOf Else
     */
    public get $If(): If | null {
        let currentElement = this.previousElementSibling as HTMLElement;

        if (isElseBlock(currentElement)) {
            return currentElement.$If;
        } else if (isIfBlock(currentElement)) {
            return currentElement;
        }

        return null;
    };

    /**
     * 
     * 
     * @private
     * @type {boolean}
     * @memberOf Else
     */
    @Attribute private conditional: boolean;

    /**
     * Attach the children to the component.
     * 
     * 
     * @memberOf Else
     */
    public attachChildren() {
        if (!this.$If) {
            Array.from(this.shadowRoot!.children).forEach(value => this.appendChild(value));
        }
    }

    /**
     * Not needed.
     * 
     * @memberOf Else
     */
    public detachChildren() { }

    /**
     * Executes the else functionality.
     * 
     * @param {boolean} previousCondition
     * @returns {boolean}
     * 
     * @memberOf Else
     */
    public execute(previousCondition: boolean): boolean {
        if (!previousCondition && this.conditional) {
            Array.from(this.children).forEach(value => this.shadowRoot!.appendChild(value));
            return true;
        }

        Array.from(this.shadowRoot!.children).forEach(value => this.appendChild(value));

        return false || previousCondition;
    }

    /**
     * Event handler for when the conditional value is changed.
     * 
     * 
     * @memberOf If
     */
    @AttributeChangedListener("conditional")
    onConditionalChanged() {
        if (this.$If) {
            this.$If.execute();
        }
    }
}