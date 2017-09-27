# Getting Started

[Return to home](../README.md)

## Table of Contents

1. [Building Components](#building-components)
    1. [Creating HTML Template](#creating-html-template)
    1. [Creating Stylesheet](#creating-stylesheet)
    1. [Creating Component Functionality](#creating-component-functionality)
        1. [Consuming the Library](#consuming-the-library)
        1. [Declare your Component](#declare-your-component)
        1. [Adding Custom Component Callbacks](#adding-custom-component-callbacks)
        1. [Watching Attributes](#watching-attributes)
        1. [Unifying DOM and Function](#unifying-dom-and-function)
        1. [Extending Built-In Elements](#extending-built-in-elements)

## Building Components

First, take a look at the example application in the examples folder. It is a TODO app built with Electron and Typescript and is using this library.

**Note** - There are some things in the way it was constructed that was done more to show off aspects of the library rather than to be the optimum solution. One of the main examples of that is the way adding and removing TODO items is happening. It watches for changes to a count attribute, rather than calling add/remove methods.

To start building your own application using the library start by NPM installing:

```CMD
npm install --save git+https://dizware.visualstudio.com/_git/web-component-library
```

Structure your app however you like. Personally, I like a structure similar to this:

```fs
app
|---views -- All non-custom component HTML will be here.
|   |   index.html
|   |   ...
|
|---styles -- All non-custom component styles will be here.
|   |   main.css
|   |   ...
|
|---src
|   |---components
|   |   |   index.ts - Contains the exports for all components
|   |   |---component1
|   |   |   |   index.ts - Contains the exports for component1
|   |   |   |   component1.html - The template.
|   |   |   |   component1.css - The styling.
|   |   |   |   component1.ts - The functionality.
|   |   |   |
|   |   |   |---subcomponent1
|   |   |   |   |   index.ts - Contains the exports for subcomponent1
|   |   |   |   |   subcomponent1.html - The template.
|   |   |   |   |   subcomponent1.css - The styling.
|   |   |   |   |   subcomponent1.ts - The functionality.
|   |   |   |   |   ...
|   |   |   |   ...
|   |   |
|   |   |---component2
|   |   |   |   index.ts - Contains the exports for component2
|   |   |   |   component2.html - The template.
|   |   |   |   component2.css - The styling.
|   |   |   |   component2.ts - The functionality.
|   |   ...
|   ...
...
```

By doing this, instead of having to import all the components into your main HTML file, you can have a single line importing the index file for your components folder. You'll automatically be importing all the components and their templates this way.

## Creating HTML template

All templates require the `<template></template>` to surround the HTML Elements for the component, kind of like the `<html></html>` tag of a normal HTML document.

```HTML
<template>
    <!--All the DOM elements for the Component-->
</template
```

## Creating Stylesheet

There are no special steps to creating a stylesheet. You can use CSS, SCSS/SASS, LESS, or any other styling language that compiles down to CSS. It's the compiled CSS that is used in the HTML.

## Creating Component Functionality

It is recommended that you use Typescript, since all the typings are provided with the library. It is not required but it should make the coding process faster.

### Consuming the Library

The library has two ways it can be consumed.

The first gives access to everything available in the library:

```Typescript
import { [pieces to import] } from "web-component-library";
```

The second allows the imports to be broken up into smaller consumables:

```Typescript
import { [decorators to import] } from "web-component-library/decorators";
import { [interfaces to import] } from "web-component-library/interfaces";
import { [typeguards to import] } from "web-component-library/typeguards";
import { [enumerations to import] } from "web-component-library/enumerations";
```

The second method is the recommended method, because it is cleaner when you have more complicated Components. [See Pieces for details on what is available for import](../README.md#the-pieces)

### Declare your Component

All components need to use the Component class decorator. Every Component requires a tag name that is kabab case and includes one hyphen(i.e. my-element), and a template URL; the other options are optional. The class also must extend HTMLElement for regular Custom Components. For Custom Components that extend native HTML Elements like `<div>` or `<input>`, [see below](#extending-built-in-elements).

```Typescript
import { Component } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
    // styleURL: ["path/to/firstStyle.css", "path/to/secondStyle.css", ...]
})
export class MyElement extends HTMLElement {

}
```

If your component had no extra functionality, you'd be done. This type of component might be rare, but its nice to not have to do so much work for a simple component.

### Adding Custom Component Callbacks

In the Custom Component v1 spec, 4 functions are listed as being used to react to changes and interactions with the DOM - `connectedCallback()`, `disconnectedCallback()`, `attributeChangedCallback()`, `adoptedCallback()`. By using the `@Component` decorator, these functions are already added to your class, and used to perform functionality from the library, like attaching the DOM children or calling callbacks for attributes that change. You cannot override these functions because they will be ignored. Instead, you will be able to bring in your needed functionality by implementing the provided interfaces - `IOnConnected`, `IOnDisconnected`, `IOnAttributeChanged`, and `IOnAdopted`. This gives you the option to only bring in what you need for your component, while also allowing you to react to these DOM changes as needed.

```Typescript
import { Component } from "web-component-library/decorators";
import { IOnConnected, IOnDisconnected, IOnAttributeChanged, IOnAdopted } from "web-component-library/interfaces"

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement implements IOnConnected, IOnDisconnected, IOnAttributeChanged, IOnAdopted {
    onConnected() {
        // This is a good place to add events.
        console.log("I'm connected");
    }

    onDisconnected() {
        // This is a good place to do cleanup.
        console.log("I'm disconnected");
    }

    onAttributeChanged(attributeName, oldValue, newValue) {
        console.log(`${attributeName} changed from ${oldValue} to ${newValue}`)
    }

    onAdopted() {
        console.log("I've been adopted.")
    }
}
```

Another interface that you might find yourself needing for your component is the `IAttachChildren` interface. Consider this situation:

* **my-element.html**

```HTML
<template>
    <div>I want this text to be the last thing to be shown rather than the first</div>
</template>
```

* **index.html**

```HTML
<html>
<body>
    <my-element>
        <div>I want this text to be the first thing to be shown rather than the last</div>
    </my-element>
    <script src="./my-element.js"></script>
</body>
</html>
```

The library will append this child to the shadow DOM but after the component template has already been added, which would look like this:

```Output
> I want this text to be the last thing to be shown rather than the first
> I want this text to be the first thing to be shown rather than the last
```

Which is obviously not what we want. To change how a component deals with DOM Children, implement the `IAttachChildren` interface:

* **my-element.ts**

```Typescript
import { Component } from "web-component-library/decorators";
import { IAttachChildren } from "web-component-library/interfaces"

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement implements IAttachChildren {
    attachChildren() {
        for (let child of this.children) {
            this.shadowRoot.insertBefore(child, this.shadowRoot.firstChild)
        }
    }

    /**
     * Not needed in this case, but you could customize the removal of items before the destruction of this element. Maybe it needs to be adopted
     * by another component or some other need that you may have, you can achieve that here.
     */
    detachChildren() {}
}
```

This will produce the results:

```Output
> I want this text to be the first thing to be shown rather than the last
> I want this text to be the last thing to be shown rather than the first
```

**Note** - If I had more than just the one item, this would probably not produce the expected results, since all the DOM children would be in opposite order. The correct results could still be achieved using this method but the order of the children would need to be switched; This example was only for ease of understanding rather than an actual solution.

### Watching Attributes

One important aspect of working with components is the ability to know when things are changing on the component and to be able to perform some reaction to that change. Native web components provides the ability to watch for changes on specific attributes. The developer must specifify the attributes to be watched with the following function:

```Typescript
static get observedAttributes() {
    return ["first-attribute", "second-attribute", ...]
}
```

Under the hood, the library will create this function for you. To observe changes to specific attributes for your component, use the `@Attributes` decorator.

```Typescript
import { Component, Attributes } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
@Attributes([
    { name: "first-attribute" },
    { name: "second-attribute", value: 0 }
])
export class MyElement extends HTMLElement {

}
```

**Note** - The ordering of class decorators is very important. You must always do `@Component` before `@Attributes`.

You'll notice that "second-attribute" is given a value of 0. When the component is added, this value will be automatically set to the "second-attribute" value if a value was not already set in the HTML:

* **No value set**

```HTML
    <!--This was changed from <my-element></my-element> when the component was loaded-->
    <my-element second-attribute="0"></my-element>
```

* **Value already set**

```HTML
    <!--This won't be changed when the component is loaded-->
    <my-element second-attribute="12"></my-element>
```

Of course, if you are watching for changes on these attributes, you will need a way to react to those changes. There are two options that can be used. The first is to implement the `IOnAttributeChanged`.

```Typescript
import { Component, Attributes } from "web-component-library/decorators";
import { IOnAttributeChanged } from "web-components-library/interfaces";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
@Attributes([
    { name: "first-attribute" },
    { name: "second-attribute", value: 0 }
])
export class MyElement extends HTMLElement implements IOnAttributeChanged {
    onAttributeChanged(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case "first-attribute":
                console.log("first-attribute was changed");
                break;
            case "second-attribute":
                console.log("second-attribute was changed");
                break;
        }

        console.log("Either first-attribute or second-attribute was changed");
    }
}
```

The second option is to use the `@AttributeChangedListener` decorator:

```Typescript
import { Component, Attributes, AttributeChangedListener } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
@Attributes([
    { name: "first-attribute" },
    { name: "second-attribute", value: 0 }
])
export class MyElement extends HTMLElement {

    @AttributeChangedListener("first-attribute")
    onFirstAttributeChanged(oldValue, newValue) {
        console.log("first-attribute was changed");
    }

    @AttributeChangedListener("second-attribute")
    onSecondAttributeChanged(oldValue, newValue) {
        console.log("second-attribute was changed");
    }

    @AttributeChangedListener(["first-attribute", "second-attribute"])
    onBothAttributesChanged(oldValue, newValue) {
        console.log("Either first-attribute or second-attribute was changed");
    }
}
```

The second option is far more versatile and is expected to be the common case, especially in more complicated components.

**Note** - It is in the plans to convert the values of oldValue and newValue from strings to the expected types in the parameters. This should reduce some unnecessary work for developers, but it doesn't do this yet.

### Unifying DOM and Function

An underlying issue with native web components is that some very simple tasks can be very wordy. For example if I had a component like this:

```HTML
<my-component count="23"></my-component>
```

Lets say I needed the count as a number for some function of my component.

```Typescript
let countString = this.getAttribute("count");

if (countString) {
    let count = Number.parseInt(countString);

    if (count !== NaN) {
        doSomething(count);
    }
}
```

That's quite a bit of work. It's not horrible, but why should there be so much work when you are working in the context of this object.

It's not just a problem with attributes, but also a problem retrieving and interacting with children, parents, and siblings of this component.

To alleviate this work a bit, the library provides some property decorators that will make these ritualisitic DOM interactions into single declarations that can be reused throughout the component.

---

For attributes, use the `@Attribute` decorator:

```Typescript
import { Component, Attribute } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement {
    @Attribute public count: number;

    constructor() {
        super();

        this.onclick = this.onClick.bind(this);
    }

    onClick() {
        this.doSomething(this.count);
    }

    doSomething(count: number) {
        this.count = count * 10;
    }
}
```

By adding the `@Attribute` decorator, the functionality of getting and setting the attribute will be added to the property, giving you the ability to directly interact with the attribute on the DOM. The name of your attribute is converted from camel case (i.e. thisIsANameExample) to kabab case(i.e. this-is-a-name-example). It may be changed in the future that you specify the name of the attribute, as these assumptions might not fit some coding style or a name makes less sense in one context compared to another.

---

For getting a single child element:

* **my-element.html**

```HTML
<template>
    <div id="child"></div>
</template>
```

* **my-element.ts**

```Typescript
import { Component, QuerySelector } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement {
    @QuerySelector("#child") private _child: HTMLDivElement;

    constructor() {
        super();

        this.onclick = this.onClick.bind(this);
    }

    onClick() {
        this._child.textContent = "Clicked";
    }
}
```

Or to get multiple children:

* **my-element.html**

```HTML
<template>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
    <div class="child"></div>
</template>
```

* **my-element.ts**

```Typescript
import { Component, QuerySelectorAll } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement {
    @QuerySelectorAll(".child") private _children: HTMLDivElement[];

    constructor() {
        super();

        this.onclick = this.onClick.bind(this);
    }

    onClick() {
        this._children.foreach(child => {
            child.textContent = "Clicked";
        });
    }
}
```

---

The default functionality is to look on the Shadow DOM for the selector, but this default behavior can be changed depending on your needs.

* **index.html**

```HTML
<html>
<body>
    <my-element>
        <div id="child">I'm detached</div>
    </my-element>
    <script src="./my-element"></script>
</body>
</html>
```

* **my-element.html**

```HTML
<template>
    <div id="child">I'm attached</div>
</template>
```

* **my-element.ts**

```Typescript
import { Component, QuerySelectorAll } from "web-component-library/decorators";
import { QuerySelectorLocation } from "web-component-library/enumerations";
import { IAttachChildren } from "web-component-library/interfaces";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement implements IAttachChildren {
    @QuerySelectorAll("#child", QuerySelectorLocation.both)
    private _children: HTMLDivElement[];

    @QuerySelector("#child", QuerySelectorLocation.detachedOnly)
    private _detachedChild: HTMLDivElement;

    constructor() {
        super();

        this.onclick = this.onClick.bind(this);
    }

    /**
     * Don't attach any DOM children on load.
     */
    attachChild() { }
    detachChild() { }

    onClick() {
        console.log(this._detachedChild.textContent);
        console.log(this._children.length);
        console.log(this._children.reduce((previousValue, currentValue) => {
            return `${currentValue}\n` +
                   `${previousValue}`;
        }), "")
    }
}
```

```Output
> I'm detached
> 2
> I'm detached
> I'm attached
```

---

Finally, some additional attributes are given to help interact with other pieces on the DOM which would normally require some typecasting to get the types you want(especially if working with other components).

* **index.html**

```HTML
<html>
<body>
    <parent-element info="hello">
        <my-element data="world"></my-element>
        <my-element data="life"></my-element>
        <my-element data="universe"></my-element>
    </parent-element>
    <script src="./parent-element.js"></script>
    <script src="./my-element.js"></script>
</body>
</html>
```

* **parent-element.html**

```HTML
<template></template>
```

* **parent-element.ts**

```Typescript
import { Component, Attribute } from "web-component-library/decorators";

@Component({
    tagName: "parent-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement {
    @Attribute public info;
}
```

* **my-element.html**

```HTML
<template></template>
```

* **my-element.ts**

```Typescript
import { Component, Attribute, ParentComponent, NextSibling, PreviousSibling } from "web-component-library/decorators";
import { ParentElement } from "./parent-element";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
})
export class MyElement extends HTMLElement {
    @NextSibling private _next: MyElement;
    @PreviousSibling private _prev: MyElement;
    @ParentComponent private _parent: ParentElement;

    @Attribute public data;

    constructor() {
        super();

        this.onclick = this.onClick.bind(this);
    }

    onClick() {
        let message = "";

        if (this._prev) {
            message += this._parent.textContent + " " + this._prev.textContent + " ";
        }

        if (this._next) {
            message += this._parent.textContent + " " + this._next.textContent + " ";
        }

        console.log(message);
    }
}
```

Clicking them in order:

```Output
> Hello life
> Hello world Hello universe
> Hello life
```

### Extending Built-In Elements

**Note** - If there is anything in the native web component spec that has shown major inconsistencies to the way the are implemented in the browser, it is this topic. Be completely aware of the compatibility of your supported browsers before going headlong into using this functionality.

In the Web Components V1 spec, it states:
>Customized built-in elements require a distinct syntax from autonomous custom elements because user agents and other software key off an element's local name in order to identify the element's semantics and behaviour. That is, the concept of customized built-in elements building on top of existing behaviour depends crucially on the extended elements retaining their original local name.

In essence, in HTML, instead of this:

```HTML
<my-element></my-element>
```

You'll need to do this:

```HTML
<input is="my-element"></input>
```

On top of this, you'll need some additional things in your JavaScript:

```Typescript
import { Component } from "web-component-library/decorators";

@Component({
    tagName: "my-element",
    templateURL: "path/to/template.html"
    options: {
        extends: "input"
    }
})
export class MyElement extends HTMLInputElement {

}
```

And that's it! You are now adding functionality a Input element, allowing you to use the already established functionality plus anything you would like to add.