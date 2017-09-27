# Interfaces

[Return to home](../README.md)

## Data Interfaces

* **IAttributeInfo** - Attribute information used to observe specific DOM attributes on the Component.
    1. **name** {string} - The name of the attribute.
    1. **value** {string} - The initial value of the attribute.
* **IComponentConfig** - Data needed for configuring the component.
    1. **tagName** {string} - The name of the DOM tag. It's required that this name must include a hyphen.
    1. **templateUrl** {string} - The URL for the HTML Template. There is no relative path calculations yet, so absolute paths only.
    1. **styleUrl** {string | string[]}(Optional) - The URL/URLs for all the styles that are to be applied to this component.
    1. **options** {CustomElementOptions} - Options used when registering a component in the CustomElementRegistry.
        1. **extends** {string} - The name of a built-in element to extend. Used to create a customized built-in element.

## Component Interfaces

* **IAttachChildren** - Provides functions that will change the functionality for how the DOM children should attach and detach from the DOM. If the component does not implement this interface, the DOM Children will be appended to the end of the shadow DOM(after anything defined in the HTML Template).
    1. **attachChildren()**
    1. **detachChildren()**

**PREFACE** - The following interfaces are used instead of the native functions(connectedCallback, disconnectedCallback, attributeChangedCallback, and adoptedCallback). This allows the user to customize the functionality of these calls without conflicting with the built in functionaly provided by the library. If you were to try using the native functions they would just be ignored. That being said, the user should be able to do anything they would have done in the native functions, by implementing these interfaces.

* **IOnConnected** - Provides a handler for when the component has connected to the DOM.
    1. **onConnected()**
* **IOnDisconnected** - Provides a handler for when the component has been disconnected from the DOM.
    1. **onDisconnected()**
* **IOnAttributeChanged** - Provides a handler for when the component attribute has changed [\*]
    1. **onAttributeChanged(attributeName: string, oldValue: string, newValue: string)**
* **IOnAdopted** - Provides a handler for when the component has been adopted by another element on the DOM.
    1. **onAdopted()**

[\*]: You can use the AttributeChangedListener if it is a specific attribute/s you want to listen to. Most of the time you could acheive the same things using the decorators, which will keep your code clean.