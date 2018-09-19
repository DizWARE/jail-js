import { Component, Attributes, Attribute, AttributeChangedListener, QuerySelector } from "jail-js/decorators";
import { IAttachChildren } from "jail-js/interfaces";
import { QuerySelectorLocation } from "jail-js/enumerations";

import * as html from "./flex-box.html";
import * as style from "./flex-box.scss";

@Component<FlexBox>({
    tagName: "flex-box",
    templateUrl: html,
    styleUrl: style
})
@Attributes([
    { name: "justify-content" },
    { name: "align-items" },
    { name: "flex-direction" }
])
export class FlexBox extends HTMLElement implements IAttachChildren {

    @Attribute private justifyContent: string;

    @Attribute private alignItems: string;

    @Attribute private flexDirection: string;

    @QuerySelector("slot", QuerySelectorLocation.attachedOnly)
    private internalSlot: HTMLSlotElement;

    attachChildren(): void {
        const children = this.children;
        const externalSlot = Object.assign(
            document.createElement("div"),
            { id: "children-slot", slot: "children" } as HTMLDivElement
        )
        
        for(var child of children) {
            externalSlot.appendChild(child);
        }

        this.appendChild(externalSlot);
    }
    detachChildren(): void {
        throw new Error("Method not implemented.");
    }

    @AttributeChangedListener("justify-content", "align-items", "flex-direction")
    onAttributeChanged() {
        this.internalSlot.style.justifyContent = this.justifyContent;
        this.internalSlot.style.alignItems = this.alignItems;
        this.internalSlot.style.flexDirection = this.flexDirection;
    }
}