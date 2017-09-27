import { If } from "../if-block";
import { Else } from "../else-block";
/**
 * Provides validation for whether the element is an If Block.
 *
 * @export
 * @param {(HTMLElement | If)} arg - The element to validate.
 * @returns {arg is If} - True if the element is a If component; false otherwise.
 */
export declare function isIfBlock(arg: HTMLElement | If): arg is If;
/**
 * Provides validation for whether the element is an Else Block.
 *
 * @export
 * @param {(HTMLElement | Else)} arg - The element instance to validate.
 * @returns {arg is Else} - True if the element is a Else component; false otherwise.
 */
export declare function isElseBlock(arg: HTMLElement | Else): arg is Else;
