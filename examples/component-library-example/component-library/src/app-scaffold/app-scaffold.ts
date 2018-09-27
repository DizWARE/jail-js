import { Component } from "jail-js/decorators";
import template from "./app-scaffold.html";

@Component<AppScaffold>({
    tagName: "app-scaffold",
    template
})
export class AppScaffold extends HTMLElement {}