export enum QuerySelectorLocation {
    attachedOnly = 1 << 0,
    detachedOnly = 1 << 1,
    both = attachedOnly | detachedOnly
}