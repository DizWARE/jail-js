import { IOnAdopted, IOnAttributeChanged, IOnConnected, IOnDisconnected, IAttachChildren } from "../interfaces/component-listeners";
/**
 * Checks if the component implements the onAdopted interface.
 *
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export declare function implementsOnAdopted(arg: HTMLElement | IOnAdopted): arg is IOnAdopted;
/**
 * Checks if the component implements the onAdopted interface.
 *
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export declare function implementsOnConnected(arg: HTMLElement | IOnConnected): arg is IOnConnected;
/**
 * Checks if the component implements the onAdopted interface.
 *
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export declare function implementsOnDisconnected(arg: HTMLElement | IOnDisconnected): arg is IOnDisconnected;
/**
 * Checks if the component implements the onAdopted interface.
 *
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export declare function implementsOnAttributeChanged(arg: HTMLElement | IOnAttributeChanged): arg is IOnAttributeChanged;
/**
 * Checks if the component implements the attachChildren interface.
 *
 * @export
 * @param {(HTMLElement | IOnAttachChildren)} arg
 * @returns {arg is IOnAttachChildren}
 */
export declare function implementsAttachChildren(arg: HTMLElement | IAttachChildren): arg is IAttachChildren;
//# sourceMappingURL=component-listeners.d.ts.map