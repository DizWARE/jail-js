import { Component, Attribute, Attributes, AttributeChangedListener, QuerySelectorAll, PreviousSibling } from "jail-js/decorators";
import { TodoItem } from "./todo-item";
import { TodoControlPanel } from "../todo-control-panel";

/**
 * This component manages a list of todo items as they are added and removed.
 * 
 * @export
 * @class TodoList
 * @extends {HTMLElement}
 * @implements {ComponentListeners.IOnConnected}
 */
@Component({
    tagName: "todo-list",
    templateUrl: `${__dirname}/todo-list.html`
})
@Attributes([
    { name: "todo-count", value: 0 }
])
export class TodoList extends HTMLElement {
    /**
     * List of items that have been added to the todo list.
     * 
     * @private
     * @type {TodoItem[]}
     * @memberOf TodoList
     */
    @QuerySelectorAll("todo-item") private _todoItems: TodoItem[];

    /**
     * Reference to the parent component.
     * 
     * @private
     * @type {TodoControlPanel}
     * @memberOf TodoList
     */
    @PreviousSibling private _todoControlPanel: TodoControlPanel;

    /**
     * Total count of todos that are currently showing.
     * 
     * @type {number}
     * @memberOf TodoList
     */
    @Attribute public todoCount: number;

    /**
     * Deletes the given todo item from the list.
     * 
     * @param {TodoItem} item 
     * 
     * @memberOf TodoList
     */
    public deleteTodoItem(item: TodoItem) {
        let itemIndex = this._todoItems.indexOf(item);

        if (itemIndex >= 0) {
            item.remove();
            this.todoCount--;
        }
    }

    /**
     * Clears all the Todo's that are marked as done.
     * 
     * 
     * @memberOf TodoList
     */
    public clearDone() {
        this._todoItems.filter(value => value.done).forEach(this.deleteTodoItem.bind(this));
    }

    /**
     * Event for when the todo count changes.
     * 
     * @param {string} oldValue 
     * @param {string} newValue 
     * @returns 
     * 
     * @memberOf TodoList
     */
    @AttributeChangedListener("todo-count")
    onTodoCountChanged(oldValue: string, newValue: string) {
        let oldCount = Number.parseInt(oldValue) || 0;
        let newCount = Number.parseInt(newValue);

        if (oldCount != this._todoItems.length) {
            return;
        }

        if (isNaN(newCount) || newCount < 0) {
            this.todoCount = 0;
            return;
        }

        if (Math.abs(newCount - oldCount) > 1) {
            this.todoCount = oldCount;
            return;
        }

        if (oldCount < newCount && newCount > 0) {
            let todoItemToAdd = new TodoItem(this._todoControlPanel.todoInputText);

            if ((todoItemToAdd.value || "").trim()) {
                this._todoControlPanel.clearInput();

                this.shadowRoot!.appendChild(todoItemToAdd);
            } else {
                this.todoCount = oldCount;
            }
        } else if (oldCount > newCount) {
            let todoItemToRemove = this._todoItems.pop();

            if (!todoItemToRemove) {
                return;
            }

            todoItemToRemove.remove();
        }
    }
}