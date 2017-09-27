/**
 * Interface for a listener that handles being connected.
 * 
 * @export
 * @interface IOnConnected
 */
export interface IOnConnected {
    onConnected(): void;
}

/**
 * Interface for a listener that handles being disconnected.
 * 
 * @export
 * @interface IOnDisconnected
 */
export interface IOnDisconnected {
    onDisconnected(): void;
}

/**
 * Interface for a listener that handles a changed attribute.
 * 
 * @export
 * @interface IOnAttributeChanged
 */
export interface IOnAttributeChanged {
    onAttributeChanged(attrName?: string, oldVal?: string, newVal?: string): void;
}

/**
 * Interface for a listener that handles being adopted.
 * 
 * @export
 * @interface IOnAdopted
 */
export interface IOnAdopted {
    onAdopted(): void;
}

/**
 * Interface for customizing the handleing of attaching children to the elements Shadow DOM.
 * 
 * @export
 * @interface IOnAttachChildren
 */
export interface IAttachChildren {
    attachChildren(): void;
    detachChildren(): void;
}