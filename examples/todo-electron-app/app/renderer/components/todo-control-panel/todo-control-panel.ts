import { Component, QuerySelector, NextSibling } from "web-component-library/decorators";
import { IOnConnected } from "web-component-library/interfaces";
import { TodoList } from "../todo-list";

/**
 * A control panel component allowing the application to add items to the TODO list.
 * 
 * @export
 * @class TodoControlPanel
 * @extends {HTMLElement}
 * @implements {ComponentListeners.IOnConnected}
 */
@Component({
    tagName: "todo-control-panel",
    templateUrl: `${__dirname}/todo-control-panel.html`,
    styleUrl: `${__dirname}/todo-control-panel.css`
})
export class TodoControlPanel extends HTMLElement implements IOnConnected {
    /**
     * Input box of this item.
     * 
     * @private
     * @type {HTMLInputElement}
     * @memberOf TodoControlPanel
     */
    @QuerySelector("#todoInput") private _todoInput: HTMLInputElement;

    /**
     * Add button.
     * 
     * @private
     * @type {HTMLElement}
     * @memberOf TodoControlPanel
     */
    @QuerySelector("#todoAdd") private _todoAdd: HTMLElement;

    /**
     * Remove button.
     * 
     * @private
     * @type {HTMLElement}
     * @memberOf TodoControlPanel
     */
    @QuerySelector("#todoRemove") private _todoRemove: HTMLElement;

    /**
     * Button for clearing all finished tasks.
     * 
     * @private
     * @type {HTMLElement}
     * @memberOf TodoControlPanel
     */
    @QuerySelector("#todoClearDone") private _todoClearDone: HTMLElement;

    /**
     * Component representing the TODO list.
     * 
     * @private
     * @type {TodoList}
     * @memberOf TodoControlPanel
     */
    @NextSibling private _todoList: TodoList;

    /**
     * Gets the text currently input in the TODO input box.
     * 
     * @readonly
     * 
     * @memberOf TodoControlPanel
     */
    public get todoInputText() {
        return this._todoInput.value;
    }

    /**
     * Event handler for when this component gets connected to the page.
     * 
     * @memberOf TodoControlPanel
     */
    onConnected() {
        document.addEventListener("click", this.focusInput.bind(this))

        this._todoInput.addEventListener("keypress", this.onEnterPressed.bind(this));
        this._todoAdd.addEventListener("click", this.onTodoAdd.bind(this));
        this._todoRemove.addEventListener("click", this.onTodoRemove.bind(this));
        this._todoClearDone.addEventListener("click", this.onTodoClearDone.bind(this));

        this.focusInput();
    }

    /**
     * Clear the input.
     * 
     * @memberOf TodoControlPanel
     */
    public clearInput() {
        this._todoInput.value = "";
    }

    /**
     * Puts focus on the input.
     * 
     * @memberOf TodoControlPanel
     */
    public focusInput() {
        this._todoInput.focus();
    }

    /**
     * Listener for clicking the add button.
     * 
     * @memberOf TodoControlPanel
     */
    onTodoAdd() {
        this._todoList.todoCount++;
    }

    /**
     * Listener for clicking the remove button.
     * 
     * @memberOf TodoControlPanel
     */
    onTodoRemove() {
        this._todoList.todoCount--;
    }

    /**
     * Listener for clicking the clear done button.
     * 
     * @memberOf TodoControlPanel
     */
    onTodoClearDone() {
        this._todoList.clearDone();
    }

    /**
     * Handles when the user presses enter.
     * 
     * @param {KeyboardEvent} event 
     * 
     * @memberOf TodoControlPanel
     */
    onEnterPressed(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this._todoList.todoCount++;
        }
    }
}