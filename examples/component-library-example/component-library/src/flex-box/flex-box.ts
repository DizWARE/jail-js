import { Component, Attributes, Attribute, AttributeChangedListener, QuerySelector } from "jail-js/decorators";
import { IAttachChildren } from "jail-js/interfaces";
import { QuerySelectorLocation } from "jail-js/enumerations";

@Component<FlexBox>({
    tagName: "flex-box",
    template: `<slot name="children"></slot>`,
    style: `
    slot {
        display: flex;
        width: 100%;
        height: 100%;
    }
    `
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
        for(var child of this.children) {
            child.slot = "children";
        }
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