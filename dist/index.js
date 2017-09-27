(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["fs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("fs")) : factory(root["fs"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(2));
	__export(__webpack_require__(4));

	//# sourceMappingURL=index.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	/**
	 * Validates that the given element was decorated with the Component decorator.
	 *
	 * @export
	 * @template T
	 * @param {(T | ICustomComponent)} arg
	 * @returns {(arg is (T & ICustomComponent))}
	 */
	function extendsCustomComponent(arg) {
	    return arg &&
	        arg.$Self !== undefined &&
	        arg.$Parent !== undefined &&
	        arg.$Child !== undefined &&
	        arg.connectedCallback !== undefined &&
	        arg.disconnectedCallback !== undefined &&
	        arg.adoptedCallback !== undefined &&
	        arg.attributeChangedCallback !== undefined;
	}
	exports.extendsCustomComponent = extendsCustomComponent;
	/**
	 * Validates that the given constructor object is a ICustomComponentClass of type T.
	 *
	 * @export
	 * @template T - A custom extension of an HTMLElement type.
	 * @param {{ new (...args): T }} constructor - The constructor object that is being validated.
	 * @returns {constructor is ICustomComponentClass<T>} - True if the object is a custom component class; False otherwise.
	 */
	function isCustomComponentClass(constructor) {
	    return constructor &&
	        constructor.observedAttributes !== undefined &&
	        constructor.tagName !== undefined;
	}
	exports.isCustomComponentClass = isCustomComponentClass;
	/**
	 * Validates that the given instance is a custom component that is of a given type of custom component.
	 *
	 * @export
	 * @template T - The class type of the instance being validated.
	 * @param {T} arg - The instance being validated.
	 * @param {({ new (...args): T } | ICustomComponentClass<T>)} constructor - The CustomComponent type to test against.
	 * @returns - True if the instance is a type of the given custom component constructor.
	 */
	function implementsCustomComponentClass(arg, constructor) {
	    return extendsCustomComponent(arg) &&
	        isCustomComponentClass(constructor) &&
	        arg.tagName.toLowerCase() === constructor.tagName.toLowerCase();
	}
	exports.implementsCustomComponentClass = implementsCustomComponentClass;

	//# sourceMappingURL=custom-component.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(3));

	//# sourceMappingURL=index.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	var QuerySelectorLocation;
	(function (QuerySelectorLocation) {
	    QuerySelectorLocation[QuerySelectorLocation["attachedOnly"] = 1] = "attachedOnly";
	    QuerySelectorLocation[QuerySelectorLocation["detachedOnly"] = 2] = "detachedOnly";
	    QuerySelectorLocation[QuerySelectorLocation["both"] = 3] = "both";
	})(QuerySelectorLocation = exports.QuerySelectorLocation || (exports.QuerySelectorLocation = {}));

	//# sourceMappingURL=query-selector-location.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(5));
	__export(__webpack_require__(9));
	__export(__webpack_require__(10));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));

	//# sourceMappingURL=index.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	const helpers_1 = __webpack_require__(7);
	/**
	 * Adds a getter and setter to the property this function wraps. The property will
	 *
	 * @export
	 * @param {CustomComponent} element
	 * @param {string} propertyKey
	 */
	function Attribute(element, propertyKey) {
	    let attributeName = helpers_1.convertToKebabCase(propertyKey);
	    let propertyType = Reflect.getMetadata("design:type", element, propertyKey);
	    function getter() {
	        let value = this.getAttribute(attributeName) || null;
	        if (value === null) {
	            return defaultValue(propertyType);
	        }
	        value = value.trim();
	        return parseValue(value, propertyType);
	    }
	    function setter(value) {
	        if (value === null) {
	            this.removeAttribute(attributeName);
	        }
	        else {
	            this.setAttribute(attributeName, stringifyValue(value, propertyType));
	        }
	    }
	    Object.defineProperty(element, propertyKey, {
	        get: getter,
	        set: setter,
	        enumerable: true,
	        configurable: true
	    });
	}
	exports.Attribute = Attribute;
	/**
	 * Stringify the value using the property type of the property
	 *
	 * @param {*} value - The value to parse.
	 * @param {*} propertyType - The property type of the property being decorated.
	 * @returns The string representation of the given value.
	 */
	function stringifyValue(value, propertyType) {
	    switch (propertyType) {
	        case Number:
	        case Boolean:
	        case String:
	        case Date:
	        case RegExp:
	        case Array:
	            return `${value}`;
	        default:
	            throw new Error(`${propertyType} cannot be properly serialized into a DOM attribute`);
	    }
	}
	/**
	 * Parse the value from a string to the property type of this property.
	 *
	 * @param {string} value - The value to parse.
	 * @param {*} propertyType - The property type of the property being decorated.
	 * @returns The parsed value of the given string.
	 */
	function parseValue(value, propertyType) {
	    switch (propertyType) {
	        case Number:
	            return Number.parseFloat(value);
	        case Boolean:
	            return value.toLowerCase() === "true" || value === "";
	        case String:
	            return value;
	        case Date:
	            return new Date(value);
	        case Array:
	            return value.split(",");
	        case RegExp:
	            return new RegExp(value);
	        default:
	            throw new Error(`${propertyType} is too complex and cannot be unnserialized from a DOM attribute.`);
	    }
	}
	/**
	 * Gets a default value for the given property type.
	 *
	 * @param {any} propertyType - The property type of the property being decorated.
	 * @returns The default value of the property type.
	 */
	function defaultValue(propertyType) {
	    switch (propertyType) {
	        case Number:
	            return 0;
	        case Boolean:
	            return false;
	        case Array:
	            return [];
	        default:
	            return null;
	    }
	}

	//# sourceMappingURL=attribute.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    "use strict";
	    var hasOwn = Object.prototype.hasOwnProperty;
	    // feature test for Symbol support
	    var supportsSymbol = typeof Symbol === "function";
	    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
	    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
	    var HashMap;
	    (function (HashMap) {
	        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
	        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
	        var downLevel = !supportsCreate && !supportsProto;
	        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	        HashMap.create = supportsCreate
	            ? function () { return MakeDictionary(Object.create(null)); }
	            : supportsProto
	                ? function () { return MakeDictionary({ __proto__: null }); }
	                : function () { return MakeDictionary({}); };
	        HashMap.has = downLevel
	            ? function (map, key) { return hasOwn.call(map, key); }
	            : function (map, key) { return key in map; };
	        HashMap.get = downLevel
	            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	            : function (map, key) { return map[key]; };
	    })(HashMap || (HashMap = {}));
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
	    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
	    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
	    var Metadata = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param propertyKey (Optional) The property key to decorate.
	      * @param attributes (Optional) The property descriptor for the target key.
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Example = Reflect.decorate(decoratorsArray, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(Example, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(Example.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, propertyKey, attributes) {
	        if (!IsUndefined(propertyKey)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
	                throw new TypeError();
	            if (IsNull(attributes))
	                attributes = undefined;
	            propertyKey = ToPropertyKey(propertyKey);
	            return DecorateProperty(decorators, target, propertyKey, attributes);
	        }
	        else {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsConstructor(target))
	                throw new TypeError();
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
	    // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class Example {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
	                throw new TypeError();
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param propertyKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryMetadataKeys(target, propertyKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        return OrdinaryOwnMetadataKeys(target, propertyKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param propertyKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, propertyKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(propertyKey))
	            propertyKey = ToPropertyKey(propertyKey);
	        var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        if (!metadataMap.delete(metadataKey))
	            return false;
	        if (metadataMap.size > 0)
	            return true;
	        var targetMetadata = Metadata.get(target);
	        targetMetadata.delete(propertyKey);
	        if (targetMetadata.size > 0)
	            return true;
	        Metadata.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                if (!IsConstructor(decorated))
	                    throw new TypeError();
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecorateProperty(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                if (!IsObject(decorated))
	                    throw new TypeError();
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function GetOrCreateMetadataMap(O, P, Create) {
	        var targetMetadata = Metadata.get(O);
	        if (IsUndefined(targetMetadata)) {
	            if (!Create)
	                return undefined;
	            targetMetadata = new _Map();
	            Metadata.set(O, targetMetadata);
	        }
	        var metadataMap = targetMetadata.get(P);
	        if (IsUndefined(metadataMap)) {
	            if (!Create)
	                return undefined;
	            metadataMap = new _Map();
	            targetMetadata.set(P, metadataMap);
	        }
	        return metadataMap;
	    }
	    // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return true;
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (!IsNull(parent))
	            return OrdinaryHasMetadata(MetadataKey, parent, P);
	        return false;
	    }
	    // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        return ToBoolean(metadataMap.has(MetadataKey));
	    }
	    // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (!IsNull(parent))
	            return OrdinaryGetMetadata(MetadataKey, parent, P);
	        return undefined;
	    }
	    // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return undefined;
	        return metadataMap.get(MetadataKey);
	    }
	    // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // 3.1.6.1 OrdinaryMetadataKeys(O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = OrdinaryGetPrototypeOf(O);
	        if (parent === null)
	            return ownKeys;
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0)
	            return ownKeys;
	        if (ownKeys.length <= 0)
	            return parentKeys;
	        var set = new _Set();
	        var keys = [];
	        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	            var key = ownKeys_1[_i];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	            var key = parentKeys_1[_a];
	            var hasKey = set.has(key);
	            if (!hasKey) {
	                set.add(key);
	                keys.push(key);
	            }
	        }
	        return keys;
	    }
	    // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
	    // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
	    function OrdinaryOwnMetadataKeys(O, P) {
	        var keys = [];
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	        if (IsUndefined(metadataMap))
	            return keys;
	        var keysObj = metadataMap.keys();
	        var iterator = GetIterator(keysObj);
	        var k = 0;
	        while (true) {
	            var next = IteratorStep(iterator);
	            if (!next) {
	                keys.length = k;
	                return keys;
	            }
	            var nextValue = IteratorValue(next);
	            try {
	                keys[k] = nextValue;
	            }
	            catch (e) {
	                try {
	                    IteratorClose(iterator);
	                }
	                finally {
	                    throw e;
	                }
	            }
	            k++;
	        }
	    }
	    // 6 ECMAScript Data Typ0es and Values
	    // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
	    function Type(x) {
	        if (x === null)
	            return 1 /* Null */;
	        switch (typeof x) {
	            case "undefined": return 0 /* Undefined */;
	            case "boolean": return 2 /* Boolean */;
	            case "string": return 3 /* String */;
	            case "symbol": return 4 /* Symbol */;
	            case "number": return 5 /* Number */;
	            case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
	            default: return 6 /* Object */;
	        }
	    }
	    // 6.1.1 The Undefined Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // 6.1.2 The Null Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
	    function IsNull(x) {
	        return x === null;
	    }
	    // 6.1.5 The Symbol Type
	    // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // 6.1.7 The Object Type
	    // https://tc39.github.io/ecma262/#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // 7.1 Type Conversion
	    // https://tc39.github.io/ecma262/#sec-type-conversion
	    // 7.1.1 ToPrimitive(input [, PreferredType])
	    // https://tc39.github.io/ecma262/#sec-toprimitive
	    function ToPrimitive(input, PreferredType) {
	        switch (Type(input)) {
	            case 0 /* Undefined */: return input;
	            case 1 /* Null */: return input;
	            case 2 /* Boolean */: return input;
	            case 3 /* String */: return input;
	            case 4 /* Symbol */: return input;
	            case 5 /* Number */: return input;
	        }
	        var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
	        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
	        if (exoticToPrim !== undefined) {
	            var result = exoticToPrim.call(input, hint);
	            if (IsObject(result))
	                throw new TypeError();
	            return result;
	        }
	        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
	    }
	    // 7.1.1.1 OrdinaryToPrimitive(O, hint)
	    // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
	    function OrdinaryToPrimitive(O, hint) {
	        if (hint === "string") {
	            var toString_1 = O.toString;
	            if (IsCallable(toString_1)) {
	                var result = toString_1.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	            var valueOf = O.valueOf;
	            if (IsCallable(valueOf)) {
	                var result = valueOf.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	        }
	        else {
	            var valueOf = O.valueOf;
	            if (IsCallable(valueOf)) {
	                var result = valueOf.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	            var toString_2 = O.toString;
	            if (IsCallable(toString_2)) {
	                var result = toString_2.call(O);
	                if (!IsObject(result))
	                    return result;
	            }
	        }
	        throw new TypeError();
	    }
	    // 7.1.2 ToBoolean(argument)
	    // https://tc39.github.io/ecma262/2016/#sec-toboolean
	    function ToBoolean(argument) {
	        return !!argument;
	    }
	    // 7.1.12 ToString(argument)
	    // https://tc39.github.io/ecma262/#sec-tostring
	    function ToString(argument) {
	        return "" + argument;
	    }
	    // 7.1.14 ToPropertyKey(argument)
	    // https://tc39.github.io/ecma262/#sec-topropertykey
	    function ToPropertyKey(argument) {
	        var key = ToPrimitive(argument, 3 /* String */);
	        if (IsSymbol(key))
	            return key;
	        return ToString(key);
	    }
	    // 7.2 Testing and Comparison Operations
	    // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
	    // 7.2.2 IsArray(argument)
	    // https://tc39.github.io/ecma262/#sec-isarray
	    function IsArray(argument) {
	        return Array.isArray
	            ? Array.isArray(argument)
	            : argument instanceof Object
	                ? argument instanceof Array
	                : Object.prototype.toString.call(argument) === "[object Array]";
	    }
	    // 7.2.3 IsCallable(argument)
	    // https://tc39.github.io/ecma262/#sec-iscallable
	    function IsCallable(argument) {
	        // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
	        return typeof argument === "function";
	    }
	    // 7.2.4 IsConstructor(argument)
	    // https://tc39.github.io/ecma262/#sec-isconstructor
	    function IsConstructor(argument) {
	        // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	        return typeof argument === "function";
	    }
	    // 7.2.7 IsPropertyKey(argument)
	    // https://tc39.github.io/ecma262/#sec-ispropertykey
	    function IsPropertyKey(argument) {
	        switch (Type(argument)) {
	            case 3 /* String */: return true;
	            case 4 /* Symbol */: return true;
	            default: return false;
	        }
	    }
	    // 7.3 Operations on Objects
	    // https://tc39.github.io/ecma262/#sec-operations-on-objects
	    // 7.3.9 GetMethod(V, P)
	    // https://tc39.github.io/ecma262/#sec-getmethod
	    function GetMethod(V, P) {
	        var func = V[P];
	        if (func === undefined || func === null)
	            return undefined;
	        if (!IsCallable(func))
	            throw new TypeError();
	        return func;
	    }
	    // 7.4 Operations on Iterator Objects
	    // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
	    function GetIterator(obj) {
	        var method = GetMethod(obj, iteratorSymbol);
	        if (!IsCallable(method))
	            throw new TypeError(); // from Call
	        var iterator = method.call(obj);
	        if (!IsObject(iterator))
	            throw new TypeError();
	        return iterator;
	    }
	    // 7.4.4 IteratorValue(iterResult)
	    // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
	    function IteratorValue(iterResult) {
	        return iterResult.value;
	    }
	    // 7.4.5 IteratorStep(iterator)
	    // https://tc39.github.io/ecma262/#sec-iteratorstep
	    function IteratorStep(iterator) {
	        var result = iterator.next();
	        return result.done ? false : result;
	    }
	    // 7.4.6 IteratorClose(iterator, completion)
	    // https://tc39.github.io/ecma262/#sec-iteratorclose
	    function IteratorClose(iterator) {
	        var f = iterator["return"];
	        if (f)
	            f.call(iterator);
	    }
	    // 9.1 Ordinary Object Internal Methods and Internal Slots
	    // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
	    // 9.1.1.1 OrdinaryGetPrototypeOf(O)
	    // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
	    function OrdinaryGetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype)
	            return proto;
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	        // Try to determine the superclass constructor. Compatible implementations
	        // must either set __proto__ on a subclass constructor to the superclass constructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype)
	            return proto;
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype)
	            return proto;
	        // If the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function")
	            return proto;
	        // If we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O)
	            return proto;
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        var arraySentinel = [];
	        var MapIterator = (function () {
	            function MapIterator(keys, values, selector) {
	                this._index = 0;
	                this._keys = keys;
	                this._values = values;
	                this._selector = selector;
	            }
	            MapIterator.prototype["@@iterator"] = function () { return this; };
	            MapIterator.prototype[iteratorSymbol] = function () { return this; };
	            MapIterator.prototype.next = function () {
	                var index = this._index;
	                if (index >= 0 && index < this._keys.length) {
	                    var result = this._selector(this._keys[index], this._values[index]);
	                    if (index + 1 >= this._keys.length) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    else {
	                        this._index++;
	                    }
	                    return { value: result, done: false };
	                }
	                return { value: undefined, done: true };
	            };
	            MapIterator.prototype.throw = function (error) {
	                if (this._index >= 0) {
	                    this._index = -1;
	                    this._keys = arraySentinel;
	                    this._values = arraySentinel;
	                }
	                throw error;
	            };
	            MapIterator.prototype.return = function (value) {
	                if (this._index >= 0) {
	                    this._index = -1;
	                    this._keys = arraySentinel;
	                    this._values = arraySentinel;
	                }
	                return { value: value, done: true };
	            };
	            return MapIterator;
	        }());
	        return (function () {
	            function Map() {
	                this._keys = [];
	                this._values = [];
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            }
	            Object.defineProperty(Map.prototype, "size", {
	                get: function () { return this._keys.length; },
	                enumerable: true,
	                configurable: true
	            });
	            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	            Map.prototype.get = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                return index >= 0 ? this._values[index] : undefined;
	            };
	            Map.prototype.set = function (key, value) {
	                var index = this._find(key, /*insert*/ true);
	                this._values[index] = value;
	                return this;
	            };
	            Map.prototype.delete = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                if (index >= 0) {
	                    var size = this._keys.length;
	                    for (var i = index + 1; i < size; i++) {
	                        this._keys[i - 1] = this._keys[i];
	                        this._values[i - 1] = this._values[i];
	                    }
	                    this._keys.length--;
	                    this._values.length--;
	                    if (key === this._cacheKey) {
	                        this._cacheKey = cacheSentinel;
	                        this._cacheIndex = -2;
	                    }
	                    return true;
	                }
	                return false;
	            };
	            Map.prototype.clear = function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            };
	            Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
	            Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
	            Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
	            Map.prototype["@@iterator"] = function () { return this.entries(); };
	            Map.prototype[iteratorSymbol] = function () { return this.entries(); };
	            Map.prototype._find = function (key, insert) {
	                if (this._cacheKey !== key) {
	                    this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
	                }
	                if (this._cacheIndex < 0 && insert) {
	                    this._cacheIndex = this._keys.length;
	                    this._keys.push(key);
	                    this._values.push(undefined);
	                }
	                return this._cacheIndex;
	            };
	            return Map;
	        }());
	        function getKey(key, _) {
	            return key;
	        }
	        function getValue(_, value) {
	            return value;
	        }
	        function getEntry(key, value) {
	            return [key, value];
	        }
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        return (function () {
	            function Set() {
	                this._map = new _Map();
	            }
	            Object.defineProperty(Set.prototype, "size", {
	                get: function () { return this._map.size; },
	                enumerable: true,
	                configurable: true
	            });
	            Set.prototype.has = function (value) { return this._map.has(value); };
	            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	            Set.prototype.delete = function (value) { return this._map.delete(value); };
	            Set.prototype.clear = function () { this._map.clear(); };
	            Set.prototype.keys = function () { return this._map.keys(); };
	            Set.prototype.values = function () { return this._map.values(); };
	            Set.prototype.entries = function () { return this._map.entries(); };
	            Set.prototype["@@iterator"] = function () { return this.keys(); };
	            Set.prototype[iteratorSymbol] = function () { return this.keys(); };
	            return Set;
	        }());
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var keys = HashMap.create();
	        var rootKey = CreateUniqueKey();
	        return (function () {
	            function WeakMap() {
	                this._key = CreateUniqueKey();
	            }
	            WeakMap.prototype.has = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.has(table, this._key) : false;
	            };
	            WeakMap.prototype.get = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.get(table, this._key) : undefined;
	            };
	            WeakMap.prototype.set = function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                table[this._key] = value;
	                return this;
	            };
	            WeakMap.prototype.delete = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? delete table[this._key] : false;
	            };
	            WeakMap.prototype.clear = function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            };
	            return WeakMap;
	        }());
	        function CreateUniqueKey() {
	            var key;
	            do
	                key = "@@WeakMap@@" + CreateUUID();
	            while (HashMap.has(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create)
	                    return undefined;
	                Object.defineProperty(target, rootKey, { value: HashMap.create() });
	            }
	            return target[rootKey];
	        }
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i)
	                buffer[i] = Math.random() * 0xff | 0;
	            return buffer;
	        }
	        function GenRandomBytes(size) {
	            if (typeof Uint8Array === "function") {
	                if (typeof crypto !== "undefined")
	                    return crypto.getRandomValues(new Uint8Array(size));
	                if (typeof msCrypto !== "undefined")
	                    return msCrypto.getRandomValues(new Uint8Array(size));
	                return FillRandomBytes(new Uint8Array(size), size);
	            }
	            return FillRandomBytes(new Array(size), size);
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8)
	                    result += "-";
	                if (byte < 16)
	                    result += "0";
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	    }
	    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	    function MakeDictionary(obj) {
	        obj.__ = undefined;
	        delete obj.__;
	        return obj;
	    }
	    // patch global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    if (hasOwn.call(Reflect, p)) {
	                        __global.Reflect[p] = Reflect[p];
	                    }
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof global !== "undefined" ? global :
	        typeof self !== "undefined" ? self :
	            Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(8));

	//# sourceMappingURL=index.js.map


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	/**
	 * Converts a class property name to a DOM attribute name.
	 *
	 * @internal
	 * @export
	 * @param {string} propertyName - The property name to convert to DOM attribute syntax.
	 * @returns {string} - The attribute name.
	 */
	function convertToKebabCase(propertyName) {
	    return propertyName.replace(/([\w])([A-Z])/g, (match, prefix, hump) => {
	        return `${prefix}-${hump}`;
	    }).toLowerCase();
	}
	exports.convertToKebabCase = convertToKebabCase;
	/**
	 * Converts a DOM attribute name to a class property name.
	 *
	 * @internal
	 * @export
	 * @param {string} attributeName - The attribute name to convert to a class property name.
	 * @returns {string} - The class property name.
	 */
	function convertToCamelCase(attributeName) {
	    return attributeName.toLowerCase().replace(/([\w])-(\w)/ig, (match, prefix, hump) => {
	        return `${prefix}${hump.toUpperCase()}`;
	    });
	}
	exports.convertToCamelCase = convertToCamelCase;

	//# sourceMappingURL=string-case-converter.js.map


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	/**
	 * Saves the attributes and their initial state in the CustomComponent metadata.
	 *
	 * @export
	 * @param {Attribute[]} attributes
	 * @returns {ClassDecorator}
	 */
	function Attributes(attributes) {
	    return function (element) {
	        Reflect.defineMetadata("component:attributes", attributes, element);
	    };
	}
	exports.Attributes = Attributes;

	//# sourceMappingURL=attributes.js.map


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	const custom_component_1 = __webpack_require__(11);
	const helpers_1 = __webpack_require__(7);
	const fs = __webpack_require__(13);
	let loadedComponentCount = 0;
	/**
	 * Class decorator that will import the HTML file and the stylesheet.
	 *
	 * @export
	 * @param {ComponentConfig} config - The configuration for this compnent.
	 * @returns {ClassDecorator}
	 */
	function Component(config) {
	    return (element) => {
	        if (!fs.existsSync(config.templateUrl)) {
	            return element;
	        }
	        Reflect.defineMetadata("component:config", config, element);
	        let newCtor = custom_component_1.CustomComponentMixin(element);
	        // Creates a link HTML element with the template import.
	        let link = Object.assign(document.createElement("link"), {
	            id: `${helpers_1.convertToCamelCase(config.tagName)}Template`, rel: "import", href: config.templateUrl,
	            /**
	             * Runs when the import is fully imported. Hooks up the stylesheet into the template and
	             * then hooks the Component functionality up with this template.
	             *
	             * @param {HTMLLinkElement} this
	             * @param {Event} event
	             */
	            onload(event) {
	                if (!this.import) {
	                    throw new Error(`The HTML Tag ${config.tagName} had a problem importing the HTML template from ${config.templateUrl}`);
	                }
	                let template = this.import.querySelector("template");
	                let styleUrls = typeof config.styleUrl === "string" ? [config.styleUrl] : config.styleUrl || [];
	                for (let styleUrl of styleUrls) {
	                    if (fs.existsSync(styleUrl)) {
	                        let style = Object.assign(document.createElement("link"), {
	                            rel: "stylesheet", href: styleUrl
	                        });
	                        template.content.insertBefore(style, template.content.firstChild);
	                    }
	                }
	                window.customElements.define(config.tagName, newCtor, config.options);
	            }
	        });
	        link.setAttribute("custom-component", "");
	        link.setAttribute("async", "");
	        document.head.appendChild(link);
	        window.customElements.whenDefined(config.tagName).then(() => {
	            // TODO - This may need a wait time to guarentee this condition. This is how the polyfill acheives this situation.
	            if (document.head.querySelectorAll("link[custom-component]").length === ++loadedComponentCount) {
	                document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: true }));
	            }
	        });
	        return newCtor;
	    };
	}
	exports.Component = Component;

	//# sourceMappingURL=component.js.map


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/// <reference path="../global.d.ts" />
	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const helpers_1 = __webpack_require__(7);
	const custom_component_1 = __webpack_require__(1);
	const component_listeners_1 = __webpack_require__(12);
	/**
	 * A promise used to wait for all components that are loaded in the application to be ready.
	 */
	const webComponentsReady = new Promise((resolve, reject) => {
	    setTimeout(() => {
	        reject("All components did not load in a reasonable timeframe.");
	    }, 3000);
	    document.addEventListener("WebComponentsReady", () => {
	        resolve();
	    });
	});
	/**
	 * Mixin for injecting custom component functionality into a class that inherits from HTMLElement.
	 *
	 * @export
	 * @template T
	 * @param {new (...args: any[]) => HTMLElement} element
	 * @returns {ICustomComponentClass<T>}
	 * @internal
	 */
	function CustomComponentMixin(element) {
	    return class CustomComponent extends element {
	        /**
	         * Creates an instance of CustomComponent.
	         *
	         *
	         * @memberOf CustomComponent
	         */
	        constructor(...args) {
	            super(...args);
	            /**
	             * List of non-direct component descendants.
	             *
	             * @private
	             * @type {CustomComponent[]}
	             * @memberOf CustomComponent
	             * @internal
	             */
	            this._child = [];
	            this.config = Reflect.getMetadata("component:config", this.constructor);
	            this.connectedCallback = this.connectedCallback.bind(this);
	            this.disconnectedCallback = this.disconnectedCallback.bind(this);
	            this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
	            this.adoptedCallback = this.adoptedCallback.bind(this);
	            this.attachShadow({ mode: "open" });
	            this._initializeView();
	            this._loadInitialState();
	        }
	        /**
	         * Returns a list of CustomComponent children that can then be accessed by index.
	         *
	         * this.$Child[3] === 4th component child.
	         *
	         * @readonly
	         * @protected
	         * @type {CustomComponent[]}
	         * @memberOf CustomComponent
	         * @internal
	         */
	        get $Child() {
	            let directChildren = Array.from(this.shadowRoot.children || []).filter(value => value.shadowRoot);
	            return this._child.concat(directChildren);
	        }
	        /**
	         * Returns this parent component.
	         *
	         * @readonly
	         * @protected
	         * @type {CustomComponent}
	         * @memberOf CustomComponent
	         * @internal
	         */
	        get $Parent() {
	            if (this.parentElement && custom_component_1.extendsCustomComponent(this.parentElement)) {
	                return this.parentElement;
	            }
	            return (this.getRootNode().host || document.body);
	        }
	        /**
	         * Returns this component. Can be used to access data in this component.
	         *
	         * @readonly
	         * @protected
	         * @type {this}
	         * @memberOf CustomComponent
	         * @internal
	         */
	        get $Self() {
	            return this;
	        }
	        /**
	         * Gets the shadow root of this element.
	         *
	         * @override - Overrides the shadow root call so that an error is thrown if the component doesn't have a shadow root or is not connected
	         */
	        get shadowRoot() {
	            let shadowRoot = super.shadowRoot;
	            if (!shadowRoot) {
	                throw new Error("Shadow root does not exist on this component.");
	            }
	            return shadowRoot;
	        }
	        /**
	         * The observed attributes for this Custom HTML Element. This will make it possible to watch for
	         * changes on attributes on the DOM Element.
	         *
	         * @readonly
	         * @static
	         *
	         * @memberOf CustomComponent
	         * @internal
	         */
	        static get observedAttributes() {
	            let metadata = Reflect.getMetadata("component:attributes", this);
	            return metadata ? metadata.map(value => value.name) : [];
	        }
	        /**
	         * Gets the tag name for this component.
	         *
	         * @readonly
	         * @static
	         *
	         * @memberOf CustomComponent
	         */
	        static get tagName() {
	            let config = Reflect.getMetadata("component:config", this);
	            return config.tagName;
	        }
	        /**
	         * Links the HTML Template and the component styling with the functionality of the web component.
	         *
	         *
	         * @memberOf CustomComponent
	         * @internal
	         */
	        connectedCallback() {
	            return __awaiter(this, void 0, void 0, function* () {
	                yield webComponentsReady;
	                this._attachChildren();
	                if (custom_component_1.extendsCustomComponent(this.$Parent) && this.$Parent.$Child.indexOf(this) < 0) {
	                    this.$Parent.addIndirectChild(this);
	                }
	                if (component_listeners_1.implementsOnConnected(this)) {
	                    this.onConnected();
	                }
	            });
	        }
	        /**
	         * Disconnects the functionality of this component from the DOM when the element is removed.
	         *
	         *
	         * @memberOf CustomComponent
	         * @internal
	         */
	        disconnectedCallback() {
	            return __awaiter(this, void 0, void 0, function* () {
	                yield webComponentsReady;
	                this._detatchChildren();
	                if (custom_component_1.extendsCustomComponent(this.$Parent)) {
	                    this.$Parent.removeIndirectChild(this);
	                }
	                if (component_listeners_1.implementsOnDisconnected(this)) {
	                    this.onDisconnected();
	                }
	            });
	        }
	        /**
	         * When an attribute, that are explicitly set to be watched using the {@link Attributes} decorator, changes this callback is called.
	         *
	         * @param {string} [attrName] - Name of the attribute that is changing.
	         * @param {string} [oldVal] - The original value.
	         * @param {string} [newVal] - The new value.
	         *
	         * @memberOf CustomComponent
	         * @internal
	         */
	        attributeChangedCallback(attrName, oldVal, newVal) {
	            return __awaiter(this, void 0, void 0, function* () {
	                yield webComponentsReady;
	                let attributeChangedListeners = Reflect.getMetadata("component:attribute-listeners", this.constructor) || [];
	                if (attrName && (attributeChangedListeners[attrName] || []).length) {
	                    attributeChangedListeners[attrName].forEach(value => value.bind(this)(oldVal, newVal));
	                }
	                if (component_listeners_1.implementsOnAttributeChanged(this)) {
	                    this.onAttributeChanged(attrName, oldVal, newVal);
	                }
	            });
	        }
	        /**
	         * When this custom element is adopted into a new document, this callback is called.
	         *
	         *
	         * @memberOf CustomComponent
	         * @internal
	         */
	        adoptedCallback() {
	            return __awaiter(this, void 0, void 0, function* () {
	                yield webComponentsReady;
	                this._attachChildren();
	                if (custom_component_1.extendsCustomComponent(this.$Parent) && this.$Parent.$Child.indexOf(this) < 0) {
	                    this.$Parent.addIndirectChild(this);
	                }
	                if (component_listeners_1.implementsOnAdopted(this)) {
	                    this.onAdopted();
	                }
	            });
	        }
	        /**
	         * Validates that the given custom component is an indirect child.
	         *
	         * @param {CustomComponent} child
	         * @returns - True if the child is an indirect child. False otherwise.
	         */
	        isIndirectChild(child) {
	            return this._child.indexOf(child) >= 0;
	        }
	        /**
	         * Removes an indirect child from its parent.
	         *
	         * @param {CustomComponent} child
	         */
	        removeIndirectChild(child) {
	            if (this.isIndirectChild(child)) {
	                this._child.splice(this._child.indexOf(child), 1);
	            }
	        }
	        /**
	         * Adds an indirect child of this parent. This allows components to directly link themselves even if they are deep within regular HTMLElements.
	         *
	         * @param {CustomComponent} child
	         */
	        addIndirectChild(child) {
	            this._child.push(child);
	        }
	        /**
	         * Handles attaching the children to the Shadow DOM. The default implementation will append the children into the Shadow DOM.
	         *
	         * @private
	         */
	        _attachChildren() {
	            if (component_listeners_1.implementsAttachChildren(this)) {
	                this.attachChildren();
	            }
	            else {
	                Array.from(this.childNodes).forEach(value => this.shadowRoot.appendChild(value));
	            }
	        }
	        /**
	         * Handles detatching the children from the component from the Shadow DOM. The default implementation will move the children out of the Shadow DOM.
	         *
	         * @private
	         */
	        _detatchChildren() {
	            if (component_listeners_1.implementsAttachChildren(this)) {
	                this.detachChildren();
	            }
	            else {
	                Array.from(this.shadowRoot.childNodes).forEach(value => this.appendChild(value));
	            }
	        }
	        /**
	         * Gathers the attributes that have been set up using the {@link Attributes} decorator, and sets the initial state for this component.
	         * If values were set in the HTML, the initial state and those values are compared; If different the attributeChangedCallback is called.
	         *
	         * @private
	         *
	         * @memberOf CustomComponent
	         */
	        _loadInitialState() {
	            let initialState = Reflect.getMetadata("component:attributes", this.constructor) || [];
	            for (let { name, value } of initialState) {
	                let currentValue = this.getAttribute(name);
	                if (!value || (value && currentValue && value !== currentValue)) {
	                    continue;
	                }
	                this.setAttribute(name, `${value}`);
	            }
	        }
	        /**
	         * Initializies the view for this component by loading the coorisponding template.
	         *
	         * @private
	         *
	         * @memberOf CustomComponent
	         */
	        _initializeView() {
	            // Load template into the HTMLElement
	            let importElement = document.getElementById(`${helpers_1.convertToCamelCase(this.config.tagName)}Template`);
	            if (!importElement || !importElement.import) {
	                return;
	            }
	            let template = importElement.import.querySelector(`template`);
	            if (!template) {
	                return;
	            }
	            let instance = template.content.cloneNode(true);
	            this.shadowRoot.appendChild(instance);
	        }
	    };
	}
	exports.CustomComponentMixin = CustomComponentMixin;

	//# sourceMappingURL=custom-component.js.map


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	/**
	 * Checks if the component implements the onAdopted interface.
	 *
	 * @export
	 * @param {(CustomComponent | OnAdopted)} arg
	 * @returns {arg is OnAdopted}
	 */
	function implementsOnAdopted(arg) {
	    return arg.onAdopted !== undefined;
	}
	exports.implementsOnAdopted = implementsOnAdopted;
	/**
	 * Checks if the component implements the onAdopted interface.
	 *
	 * @export
	 * @param {(CustomComponent | OnAdopted)} arg
	 * @returns {arg is OnAdopted}
	 */
	function implementsOnConnected(arg) {
	    return arg.onConnected !== undefined;
	}
	exports.implementsOnConnected = implementsOnConnected;
	/**
	 * Checks if the component implements the onAdopted interface.
	 *
	 * @export
	 * @param {(CustomComponent | OnAdopted)} arg
	 * @returns {arg is OnAdopted}
	 */
	function implementsOnDisconnected(arg) {
	    return arg.onDisconnected !== undefined;
	}
	exports.implementsOnDisconnected = implementsOnDisconnected;
	/**
	 * Checks if the component implements the onAdopted interface.
	 *
	 * @export
	 * @param {(CustomComponent | OnAdopted)} arg
	 * @returns {arg is OnAdopted}
	 */
	function implementsOnAttributeChanged(arg) {
	    return arg.onAttributeChanged !== undefined;
	}
	exports.implementsOnAttributeChanged = implementsOnAttributeChanged;
	/**
	 * Checks if the component implements the attachChildren interface.
	 *
	 * @export
	 * @param {(HTMLElement | IOnAttachChildren)} arg
	 * @returns {arg is IOnAttachChildren}
	 */
	function implementsAttachChildren(arg) {
	    return arg.attachChildren !== undefined &&
	        arg.detachChildren !== undefined;
	}
	exports.implementsAttachChildren = implementsAttachChildren;

	//# sourceMappingURL=component-listeners.js.map


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(6);
	const helpers_1 = __webpack_require__(7);
	function AttributeChangedListener(attributeNames) {
	    return function (element, methodName, descriptor) {
	        attributeNames = typeof attributeNames === "string" ? [attributeNames] : [...new Set(attributeNames)];
	        for (let attributeName of attributeNames) {
	            attributeName = helpers_1.convertToKebabCase(attributeName);
	            let attributeListeners = Reflect.getMetadata("component:attribute-listeners", element.constructor) || {};
	            attributeListeners[attributeName] = [...(attributeListeners[attributeName] || []), element[methodName]];
	            Reflect.defineMetadata("component:attribute-listeners", attributeListeners, element.constructor);
	        }
	    };
	}
	exports.AttributeChangedListener = AttributeChangedListener;

	//# sourceMappingURL=attribute-changed-listener.js.map


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	const enumerations_1 = __webpack_require__(2);
	/**
	 * Converts the decorated property into a getter, that retrieves the child element matching the selector from the DOM.
	 *
	 * Its important to stress, this will not break through child shadow DOMs. Attempting to access a child components' child will have to go through the child component.
	 *
	 * @export
	 * @template T - An Custom Component type containing this property.
	 * @param {string} selector - The DOM selector to use to find the child element.
	 * @param {Location} [location=Location.attachedOnly] - Whether to search for attached only, detached only, or both.
	 * @returns {PropertyDecorator}
	 */
	function QuerySelector(selector, location = enumerations_1.QuerySelectorLocation.attachedOnly) {
	    return function (element, propertyKey) {
	        function getter() {
	            return (location & enumerations_1.QuerySelectorLocation.attachedOnly && this.shadowRoot.querySelector(selector)) ||
	                (location & enumerations_1.QuerySelectorLocation.detachedOnly && this.querySelector(selector)) || null;
	        }
	        Object.defineProperty(element, propertyKey, {
	            get: getter,
	            enumerable: true,
	            configurable: true
	        });
	    };
	}
	exports.QuerySelector = QuerySelector;
	/**
	 * Converts the decorated property into a getter, that retrieves child elements matching the selector from the DOM.
	 *
	 * Its important to stress, this will not break through child shadow DOMs. Attempting to access a child components' child will have to go through the child component.
	 *
	 * @export
	 * @template T - An Custom Component type containing this property.
	 * @param {string} selector - The DOM selector to use to find the child elements.
	 * @param {Location} [location=Location.attachedOnly] - Whether to search for attached only, detached only, or both.
	 * @returns {PropertyDecorator}
	 */
	function QuerySelectorAll(selector, location = enumerations_1.QuerySelectorLocation.attachedOnly) {
	    return function (element, propertyKey) {
	        let propertyType = Reflect.getMetadata("design:type", element, propertyKey);
	        function getter() {
	            if (propertyType !== Array) {
	                return null;
	            }
	            let elements = [
	                ...((location & enumerations_1.QuerySelectorLocation.attachedOnly && this.shadowRoot.querySelectorAll(selector)) || []),
	                ...((location & enumerations_1.QuerySelectorLocation.detachedOnly && this.querySelectorAll(selector)) || [])
	            ];
	            return elements;
	        }
	        Object.defineProperty(element, propertyKey, {
	            get: getter,
	            enumerable: true,
	            configurable: true
	        });
	    };
	}
	exports.QuerySelectorAll = QuerySelectorAll;
	/**
	 * Converts the decorated property to a getter that retreives the parent component of this element.
	 *
	 * @export
	 * @template T - An Custom Component type containing this property.
	 * @param {T} element - The element containing this property.
	 * @param {string} propertyKey - The property being decorated.
	 */
	function ParentComponent(element, propertyKey) {
	    function getter() {
	        return this.$Parent;
	    }
	    Object.defineProperty(element, propertyKey, {
	        get: getter,
	        enumerable: true,
	        configurable: true
	    });
	}
	exports.ParentComponent = ParentComponent;
	/**
	 * Converts the decorated property to a getter that retreives the next sibling element for this element.
	 *
	 * @export
	 * @template T - An Custom Component type containing this property.
	 * @param {T} element - The element containing this property.
	 * @param {string} propertyKey - The property being decorated.
	 */
	function NextSibling(element, propertyKey) {
	    function getter() {
	        return this.nextElementSibling;
	    }
	    Object.defineProperty(element, propertyKey, {
	        get: getter,
	        enumerable: true,
	        configurable: true
	    });
	}
	exports.NextSibling = NextSibling;
	/**
	 * Converts the decorated property to a getter that retreives the previous sibling element for this element.
	 *
	 * @export
	 * @template T - An Custom Component type containing this property.
	 * @param {T} element - The element containing this property.
	 * @param {string} propertyKey - The property being decorated.
	 */
	function PreviousSibling(element, propertyKey) {
	    function getter() {
	        return this.previousElementSibling;
	    }
	    Object.defineProperty(element, propertyKey, {
	        get: getter,
	        enumerable: true,
	        configurable: true
	    });
	}
	exports.PreviousSibling = PreviousSibling;

	//# sourceMappingURL=query-selector.js.map


/***/ })
/******/ ])
});
;