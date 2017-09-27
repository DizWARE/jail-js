import { IOnAdopted, IOnAttributeChanged, IOnConnected, IOnDisconnected, IAttachChildren } from "../interfaces/component-listeners";

/**
 * Checks if the component implements the onAdopted interface.
 * 
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export function implementsOnAdopted(arg: HTMLElement | IOnAdopted): arg is IOnAdopted {
    return (arg as IOnAdopted).onAdopted !== undefined;
}

/**
 * Checks if the component implements the onAdopted interface.
 * 
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export function implementsOnConnected(arg: HTMLElement | IOnConnected): arg is IOnConnected {
    return (arg as IOnConnected).onConnected !== undefined;
}

/**
 * Checks if the component implements the onAdopted interface.
 * 
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export function implementsOnDisconnected(arg: HTMLElement | IOnDisconnected): arg is IOnDisconnected {
    return (arg as IOnDisconnected).onDisconnected !== undefined;
}

/**
 * Checks if the component implements the onAdopted interface.
 * 
 * @export
 * @param {(CustomComponent | OnAdopted)} arg
 * @returns {arg is OnAdopted}
 */
export function implementsOnAttributeChanged(arg: HTMLElement | IOnAttributeChanged): arg is IOnAttributeChanged {
    return (arg as IOnAttributeChanged).onAttributeChanged !== undefined;
}

/**
 * Checks if the component implements the attachChildren interface.
 * 
 * @export
 * @param {(HTMLElement | IOnAttachChildren)} arg 
 * @returns {arg is IOnAttachChildren} 
 */
export function implementsAttachChildren(arg: HTMLElement | IAttachChildren): arg is IAttachChildren {
    return (arg as IAttachChildren).attachChildren !== undefined &&
        (arg as IAttachChildren).detachChildren !== undefined;
}