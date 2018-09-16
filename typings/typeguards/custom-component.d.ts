import { ICustomComponent, ICustomComponentClass } from "../interfaces/custom-component";
import { IElementConstructor } from "../interfaces/element-constructor";
/**
 * Validates that the given element was decorated with the Component decorator.
 *
 * @export
 * @template T
 * @param {(T | ICustomComponent)} arg
 * @returns {(arg is (T & ICustomComponent))}
 */
export declare function extendsCustomComponent<T extends HTMLElement>(arg: T | ICustomComponent): arg is (T & ICustomComponent);
/**
 * Validates that the given constructor object is a ICustomComponentClass of type T.
 *
 * @export
 * @template T - A custom extension of an HTMLElement type.
 * @param {{ new (...args): T }} constructor - The constructor object that is being validated.
 * @returns {constructor is ICustomComponentClass<T>} - True if the object is a custom component class; False otherwise.
 */
export declare function isCustomComponentClass<T extends HTMLElement>(constructor: IElementConstructor<T>): constructor is ICustomComponentClass<T>;
/**
 * Validates that the given instance is a custom component that is of a given type of custom component.
 *
 * @export
 * @template T - The class type of the instance being validated.
 * @param {T} arg - The instance being validated.
 * @param {({ new (...args): T } | ICustomComponentClass<T>)} constructor - The CustomComponent type to test against.
 * @returns - True if the instance is a type of the given custom component constructor.
 */
export declare function implementsCustomComponentClass<T extends HTMLElement>(arg: T, constructor: IElementConstructor<T> | ICustomComponentClass<T>): boolean;
//# sourceMappingURL=custom-component.d.ts.map