import { Component } from "jail-js/decorators";
import template from "./app-scaffold.html";

const style = `
::slotted(*) {
    width: 100%;
    height: 100%;
}
`;

@Component<AppScaffold>({
    tagName: "app-scaffold",
    template,
    style
})
export class AppScaffold extends HTMLElement {}