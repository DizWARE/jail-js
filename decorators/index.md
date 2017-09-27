# Decorators

[Return to home](../README.md)

## Class Decorators

* **Component** - Essentially, this decorator links the HTMLTemplate, CSS, and the class together.
* **Attributes** - Takes a list of attribute names and initial values. The attributes provided here will be watched for changes.

## Property Decorators

* **Attribute** - Converts the property to a getter/setter that will directly read and write to the corresponding attribute on the DOM. It will convert the property name from camel case to kabab casing i.e. myAttr1 -> my-attr1
* **QuerySelector/QuerySelectorAll** - Converts the property to a getter that will query for a child on this component with the given selector. It can also be adjusted to look on the Shadow DOM only, or to look on the DOM children only, or both using the QuerySelectorLocation value. The type for the property can be set to what best describes the Element you are retrieving.
* **ParentComponent** - Converts the property to a getter that will get the parent of this component. It's important to note that it uses ShadowDOM traversal which means it isn't getting the parent element(which can be done just using this.parentElement), but rather going to the parent Custom Component that owns this Component. The type for the property can be set to what best describes the Element you are retrieving.
* **NextSibling/PreviousSibling** - Converts the property to a getter that will get this element's next or previous sibling. The type for the property can be set to what best describes the Element you are retrieving.

## Method Decorators

* **AttributeChangedListener** - Marks the method as a listener for changes to the attribute/s given in the parameters. When that attribute changes, this function is called and provides the old value and new value for processing.
