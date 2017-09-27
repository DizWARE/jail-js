# Typeguards

[Return to home](../README.md)

* **extendsCustomComponent`<T extends HTMLElement>`(element: T)** - Typeguard that validates that the class of the given element was decorated with the Component decorator.
* **isCustomComponentClass`<T extends HTMLElement>`(constructor: typeof T)** - Typeguard that validates that the given class was decorated with the Component decorator.
* **implementsCustomComponentClass`<T extends HTMLElement>`(element: T, constructor)** - Typeguard that validates that the given element is a custom component that is of a given type of custom component. This should have many uses but a common one would be if you had a list of children elements of many different types, and only wanted to select the children of a specific component type.