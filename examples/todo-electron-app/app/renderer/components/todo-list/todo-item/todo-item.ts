import { Enumerations } from "web-component-library";
import { IOnConnected } from "web-component-library/interfaces";
import { Component, Attributes, Attribute, AttributeChangedListener, QuerySelector, ParentComponent } from "web-component-library/decorators";
import { TodoList } from "../todo-list";

/**
 * An TODO item component that gets added and removed from the TODO list.
 * 
 * @export
 * @class TodoItem
 * @extends {HTMLElement}
 * @implements {ComponentListeners.IOnConnected}
 */
@Component({
    tagName: "todo-item",
    templateUrl: `${__dirname}/todo-item.html`,
    styleUrl: `${__dirname}/todo-item.css`
})
@Attributes([
    { name: "value" }
])
export class TodoItem extends HTMLElement implements IOnConnected {
    /**
     * Label element with the TODO item information.
     * 
     * @private
     * @type {HTMLLabelElement}
     * @memberOf TodoItem
     */
    @QuerySelector("#todoValue", Enumerations.QuerySelectorLocation.both) private _todoValue: HTMLLabelElement;

    /**
     * A button for removing the todo item.
     * 
     * @private
     * @type {HTMLElement}
     * @memberOf TodoItem
     */
    @QuerySelector("#todoRemove") private _todoRemove: HTMLElement;

    /**
     * The list containing this item.
     * 
     * @private
     * @type {TodoList}
     * @memberOf TodoItem
     */
    @ParentComponent private _todoList: TodoList;

    /**
     * The value of the TODO item.
     * 
     * @type {string}
     * @memberOf TodoItem
     */
    @Attribute public value: string;

    /**
     * Creates an instance of TodoItem.
     * @param {string} value - The value of the TODO item.
     * 
     * @memberOf TodoItem
     */
    constructor(value: string) {
        super();

        this.value = value;
    }

    /**
     * Gets whether this item is marked as done or not.
     * 
     * @readonly
     * @type {boolean}
     * @memberOf TodoItem
     */
    public get done(): boolean {
        return this._todoValue.className === "done";
    }

    /**
     * Gets references to children and hooks up event listeners. 
     * 
     * @memberOf TodoItem
     */
    onConnected() {
        this._todoValue.textContent = this.value;
        this._todoValue.addEventListener("click", this.onDone.bind(this));
        this._todoRemove.addEventListener("click", this.onRemove.bind(this))
    }

    /**
     * Handler for when the value attribute changes. Moves the value into the todo label.
     * 
     * @param {string} oldValue 
     * @param {string} newValue 
     * @returns 
     * 
     * @memberOf TodoItem
     */
    @AttributeChangedListener("value")
    onValueChanged(oldValue: string, newValue: string) {
        this._todoValue.textContent = newValue;
    }

    /**
     * Handler for when the remove button is clicked.
     * 
     * @memberOf TodoItem
     */
    onRemove() {
        if (this._todoList) {
            this._todoList.deleteTodoItem(this);
        }
    }

    /**
     * Handler for when an item is marked or unmarked as done.
     * 
     * @memberOf TodoItem
     */
    onDone() {
        this._todoValue.className = this.done ? "" : "done";
    }
}