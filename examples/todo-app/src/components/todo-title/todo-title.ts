import { Component } from "jail-js/decorators"
import * as html from "./todo-title.html";
import * as style from "./todo-title.scss";

@Component<TodoTitle>({
    tagName: "todo-title",
    templateUrl: html,
    styleUrl: style
})
export class TodoTitle extends HTMLElement {}