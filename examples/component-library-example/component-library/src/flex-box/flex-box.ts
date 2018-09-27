import { Component, Attributes, Attribute, AttributeChangedListener, QuerySelector } from "jail-js/decorators";
import { IAttachChildren } from "jail-js/interfaces";
import { QuerySelectorLocation } from "jail-js/enumerations";

const template = `<slot name="flex-children"></slot>`;
const style = `
slot {
    display: flex;
    width: 100%;
    height: 100%;
}
`;

@Component<FlexBox>({
    tagName: "flex-box",
    template,
    style
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
            child.slot = "flex-children";
        }
    }
    detachChildren(): void {
        for(var child of this.children) {
            child.slot = "";
        }
    }

    @AttributeChangedListener("justify-content", "align-items", "flex-direction")
    onAttributeChanged() {
        this.internalSlot.style.justifyContent = this.justifyContent;
        this.internalSlot.style.alignItems = this.alignItems;
        this.internalSlot.style.flexDirection = this.flexDirection;
    }
}