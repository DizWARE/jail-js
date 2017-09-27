/**
 * Represents an IF block in the HTML Document. If the conditional is true, it will render the elements in its DOM tree. Otherwise, nothing is rendered.
 *
 * @export
 * @class If
 * @extends {CustomComponent}
 */
export declare class If extends HTMLElement {
    /**
     * The conditional for the if statement.
     *
     * @private
     * @type {boolean}
     * @memberOf If
     */
    protected conditional: boolean;
    /**
     * Creates an instance of If.
     *
     *
     * @memberOf If
     */
    constructor();
    /**
     * Executes the full If-Else block. If the conditional passes, the IF will render its children; Otherwise it will be hidden.
     *
     * All the Else bloocks will then be processed.
     *
     *
     * @memberOf If
     */
    execute(): void;
    /**
     * Event handler for when the conditional value is changed.
     *
     *
     * @memberOf If
     */
    onConditionalChanged(): void;
}
