import { Component, Attributes, Attribute, AttributeChangedListener, QuerySelector } from "jail-js/decorators";
import { IAttachChildren } from "jail-js/interfaces";
import { QuerySelectorLocation } from "jail-js/enumerations";

const template = `<slot name="grid-children"></slot>`;
const style = `
slot {
    display: grid;
    width: 100%;
    height: 100%;
}
`;

@Component<GridLayout>({
    tagName: "grid-layout",
    template,
    style
})
@Attributes([
    { name: "grid" },
    { name: "grid-template-areas" },
    { name: "grid-template-columns" },
    { name: "grid-template-rows" },
    { name: "grid-template" },
    { name: "grid-auto-flow" },
    { name: "grid-auto-rows" },
    { name: "grid-auto-columns"},
    { name: "grid-gap" },
    { name: "grid-row-gap" },
    { name: "grid-column-gap" },
    { name: "justify-content" },
    { name: "align-items" }
])
export class GridLayout extends HTMLElement implements IAttachChildren {
    @Attribute private grid: string;

    // Gap attributes
    @Attribute private gridGap: string;
    @Attribute private gridColumnGap: string;
    @Attribute private gridRowGap: string;

    // Attribute for defining how to layout items added to the grid.
    @Attribute private gridAutoFlow: string;
    
    // Auto column/row sizing definitions.
    @Attribute private gridAutoColumns: string;
    @Attribute private gridAutoRows: string;

    // Grid template attributes.
    @Attribute private gridTemplate: string;
    @Attribute private gridTemplateRows: string;
    @Attribute private gridTemplateColumns: string;
    @Attribute private gridTemplateAreas: string;
    
    // Flex properties for laying out items in grid
    @Attribute private justifyContent: string;
    @Attribute private alignItems: string;

    @QuerySelector("slot", QuerySelectorLocation.attachedOnly)
    private internalSlot: HTMLSlotElement;

    attachChildren(): void {        
        for(var child of this.children) {
            child.slot = "grid-children";
        }
    }
    detachChildren(): void {
        for(var child of this.children) {
            child.slot = "";
        }
    }

    @AttributeChangedListener(
        "grid",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "grid-auto-rows",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-gap",
        "grid-row-gap",
        "grid-column-gap",
        "justify-content",
        "align-items"
    )
    onAttributeChanged() {
        this.internalSlot.style.grid = this.grid;

        this.internalSlot.style.gap = this.internalSlot.style.gridGap = this.gridGap;
        this.internalSlot.style.gridColumnGap = this.gridColumnGap;
        this.internalSlot.style.gridRowGap = this.gridRowGap;

        this.internalSlot.style.gridAutoFlow = this.gridAutoFlow;

        this.internalSlot.style.gridAutoColumns = this.gridAutoColumns;
        this.internalSlot.style.gridAutoRows = this.gridAutoRows;

        this.internalSlot.style.gridTemplateAreas = this.gridTemplateAreas;
        this.internalSlot.style.gridTemplate = this.gridTemplate;
        this.internalSlot.style.gridTemplateColumns = this.gridTemplateColumns;
        this.internalSlot.style.gridTemplateRows = this.gridTemplateRows;

        this.internalSlot.style.alignItems = this.alignItems;
        this.internalSlot.style.justifyContent = this.justifyContent;
    }
}