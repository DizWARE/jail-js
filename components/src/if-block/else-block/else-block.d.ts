import { If } from "../if-block";
import { IAttachChildren } from "web-component-library/interfaces";
/**
 * Represents an Else block in the HTML Document. It is activated within an If block. If the if fails, it run through any else blocks that are within the if statement.
 *
 * @export
 * @class Else
 * @extends {CustomComponent}
 * @implements {IOnConnected}
 */
export declare class Else extends HTMLElement implements IAttachChildren {
    /**
     * Stores the parent IF block.
     *
     * @type {If}
     * @memberOf Else
     */
    readonly $If: If | null;
    /**
     *
     *
     * @private
     * @type {boolean}
     * @memberOf Else
     */
    private conditional;
    /**
     * Attach the children to the component.
     *
     *
     * @memberOf Else
     */
    attachChildren(): void;
    /**
     * Not needed.
     *
     * @memberOf Else
     */
    detatchChildren(): void;
    /**
     * Executes the else functionality.
     *
     * @param {boolean} previousCondition
     * @returns {boolean}
     *
     * @memberOf Else
     */
    execute(previousCondition: boolean): boolean;
    /**
     * Event handler for when the conditional value is changed.
     *
     *
     * @memberOf If
     */
    onConditionalChanged(): void;
}
