import { Component } from "web-component-library/decorators";

@Component({
    tagName: "todo-title",
    templateUrl: `${__dirname}/todo-title.html`,
    styleUrl: `${__dirname}/todo-title.css`
})
export class TodoTitle extends HTMLElement {}