# JAIL.js - Just-Another-Interesting-Library - Official Name TBD

## Table of Contents

1. [Intro to Library](#intro-to-library)
    1. [Example](#example)
        1. [Without the Library](#without-the-library)
        1. [With the Library](#with-the-library)
    1. [The Pieces](#the-pieces)
        1. [Decorators](./decorators/index.md)
            1. [Class Decorators](./decorators/index.md#class-decorators)
            1. [Property Decorators](./decorators/index.md#property-decorators)
            1. [Method Decorators](./decorators/index.md#method-decorators)
        1. [Enumerations](./enumerations/index.md)
        1. [Interfaces](./interfaces/index.md)
            1. [Data Interfaces](./interfaces/index.md#data-interfaces)
            1. [Component Interfaces](./interfaces/index.md#component-interfaces)
        1. [Typeguards](./typeguards/index.md)
    1. [Getting Started](#getting-started)
        1. [Consume Library](#consume-library)
        1. [Build Components](#build-components)
            1. [Create your Main HTML](#create-your-main-html)
            1. [Create your HTML Template](#create-your-html-template)
            1. [Create your Stylesheet](#create-your-stylesheet)
            1. [Create your Javascript](#create-your-javascript)

## Intro to Library

This library provides developers an abstraction from the work required to create and use native web components. It is built with Typescript, and targets the V1 spec of Web Components and Shadow DOM. It also utilizes features from HTML Imports and the Template tag, providing a full native suite of features.

Instead of trying to explain too much of why, I'll provide some examples of using the web components without the library vs using this library. This is a very limited view. You have to think of using these in more realistic projects with tens to hundreds of different components.

### Example

#### Without the Library

* **index.html**

```HTML
<html>
<head>
    <link rel="import" href="./basic-element.html" />
</head>
<body>
    <basic-element>
        <div>Hello World</div>
    </basic-element>
</body>
</html>
```

* **basic-element.html**

```HTML
<template id="basicElement">
  <style>
    p { color: orange; }
  </style>
  <p>Cool, I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
  <input type="text" id="basicInput">
</template>

<script src="./script"></script>
```

* **basic-element.ts**

```Typescript

class BasicElement extends HTMLElement {

    /**
     * Property for the input child.
     */
    private _input: HTMLInputElement;

    constructor() {
        super();

        let ownerDocument = (document.currentScript || document._currentScript).ownerDocument;
        let t = ownerDocument.querySelector('#basicElement');
        let clone = t.content.cloneNode(true);

        // Create a shadow DOM
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(clone);

        this._input = shadowRoot.querySelector("#basicInput");

        // Set an initial state for the component attributes.
        this.setAttribute("attr1", 0);
        this.setAttribute("attr2", true);
    }

    /**
     * List all the attributes that should be watched.
     */
    static observedAttributes() {
        return [ "my-attr1", "my-attr2" ]
    }

    connectedCallback() {
        // Bring in all the DOM children into the shadow DOM, so they get displayed.
        for (let child of this.children) {
            shadowRoot.appendChild(child);
        }
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        switch(attrName) {
            case "my-attr1":
                this.onAttr1Changed(oldValue, newValue);
                break;
            case "my-attr2":
                this.onAttr2Changed(oldValue, newValue);
                break;
        }
    }

    onAttr1Changed(oldValue: number, newValue: number) {
        let attr2 = this.getAttribute("my-attr2");

        if (attr2) {
            console.log(`Hello, the number value changed from ${oldValue} to ${newValue}`)
        }
    }

    onAttr2Changed(oldValue: boolean, newValue: boolean) {
        if (newValue) {
            console.log(`Hello, your current value is ${this._input.value}`)
        }
    }
}

document.registerElement('basic-element', BasicElement);
```

Couple things to note with not using the library

* No css is being used here because its actually a very complex problem to link css from a file in HTML imports. The relative path of the imports will be whatever the hosting HTML file is, not the HTML file that is being imported. The `<style>` tag is used instead
* Without using the web-components polyfill or writing something yourself, a race condition will be created where a parent component is finished loading and is beginning to do some of its functionality and a child component hasn't loaded yet; Unexpected behavior will occur if you try to use the child that hasn't loaded.

#### With the Library

* **index.html**

```HTML
<html>
<body>
    <basic-element>
        <div>Hello World</div>
    </basic-element>
</body>

<!--The classes of all the components in your application need to be loaded.-->
<!--This part could easily be one line if you already are using index module exports.-->
<script src="./basic-element"></script>
</html>
```

* **basic-element.css**

```CSS
p {
    color: orange;
}
```

* **basic-element.html**

```HTML
<template>
  <p>Cool, I'm in Shadow DOM. My markup was stamped from a &lt;template&gt;.</p>
  <input type="text" id="basicInput">
</template>
```

* **basic-element.ts**

```Typescript
import { Component, Attributes, Attribute, AttributeChangedListener } from "web-component-library/decorators";

@Component({
    tagName: "basic-element",
    templateUrl: `${__dirname}/basic-element.html`,
    styleUrl: `${__dirname}/basic-element.css`
})
@Attributes([
    { name: "my-attr1"},
    { name: "my-attr2", value: true }
])
class BasicElement extends HTMLElement {

    /**
     * Property for the input child.
     */
    @QuerySelector("#basicInput") private _input: HTMLInputElement;

    @Attribute private myAttr1 = 0; // This value could have also been set using the @Attributes decorator by adding a value to the attribute info.
    @Attribute private myAttr2;

    @AttributeChangedListener("my-attr1")
    onAttr1Changed(oldValue: number, newValue: number) {
        if (this.myAttr2) {
            console.log(`Hello, the number value changed from ${oldValue} to ${newValue}`)
        }
    }

    @AttributeChangedListener("my-attr2")
    onAttr2Changed(oldValue: boolean, newValue: boolean) {
        if (newValue) {
            console.log(`Hello, your current value is ${this._input.value}`)
        }
    }
}
```

## The Pieces

* [View Docs for all the Decorators](./decorators/index.md)

* [View Docs for all the Interfaces](./interfaces/index.md)

* [View Docs for all the Enumerations](./enumerations/index.md)

* [View Docs for all the Typeguards](./typeguards/index.md)

## Getting Started

A more detailed guide can be found [here](./tutorial/index.md)

To start building your own application using the library start by NPM installing:

```CMD
npm install --save git+https://dizware.visualstudio.com/_git/web-component-library
```

No other steps need to be made to start using the library.

### Consume Library

To consume the library in your JavaScript/Typescript:

```Typescript
import { [decorators to import] } from "web-component-library/decorators";
import { [interfaces to import] } from "web-component-library/interfaces";
import { [typeguards to import] } from "web-component-library/typeguards";
import { [enumerations to import] } from "web-component-library/enumerations";
```

### Build Components

#### Create your main HTML

* **index.html**

```HTML
<html>
<body>
    <my-element></my-element>
    <script src="./my-element.js"></script>
</body>
</html>
```

#### Create your HTML template

* **my-element.html**

```HTML
<template>
    <div id="child"></div>
</template>
```

#### Create your stylesheet

* **my-element.css**

```CSS
#child {
    color: red;
}
```

#### Create your Javascript

First import the pieces you need from the library, write your code, and prosper.

* **my-element.ts**

```Typescript
import { Component, Attribute, QuerySelector, Attributes, AttributeChangedListener } from "web-component-library/decorators";
import { IOnConnected } from "web-component-library/interfaces";

@Component({
    tagName: "my-element",
    templateURL: "path/to/my-element.html",
    styleURL: "path/to/my-element.css" // or ["path/to/style1.css", "path/to/style2.css"]
})
@Attributes([
    { name: "first-attribute" },
    { name: "second-attribute", value: 0 }
])
export class MyElement extends HTMLElement implements IOnConnected {
    /**
     * Reads and writes the `first-attribute` attribute to the DOM.
     */
    @Attribute public firstAttribute: boolean = true;

    /**
     * Reads and writes the `second-attribute` attribute to the DOM.
     */
    @Attribute private secondAttribute: number;

    /**
     * Reads the child with the #child selector from the DOM.
     */
    @QuerySelector("#child") private _child;

    /**
     * If you add a constructor, you must always call super() as the first line.
     */
    constructor() {
        super();

        // Bind the handler to this event.
        this.onChildClicked = this.onChildClicked.bind(this);
    }

    /**
     * Hook up the child clicked event.
     */
    onConnected() {
        this._child.addEventListener("click", this.onChildClicked)
    }

    /**
     * Increment the attribute when the child is clicked.
     */
    onChildClicked() {
        this.secondAttribute++;
    }

    /**
     * Log when first-attribute is changed.
     */
    @AttributeChangedListener("first-attribute")
    onFirstAttributeChanged(oldValue, newValue) {
        console.log("first-attribute was changed");
    }

    /**
     * Log when second-attribute is changed.
     */
    @AttributeChangedListener("second-attribute")
    onSecondAttributeChanged(oldValue, newValue) {
        console.log("second-attribute was changed");
    }
}
