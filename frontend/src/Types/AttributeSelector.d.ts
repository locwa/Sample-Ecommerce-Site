export type AttributeSelector = {
    id: string;
    type: string;
    itemValue: string;
    itemDisplayValue: string;
    selectedId: string | null;
    onSelect: (id) => string | void;
    size: string;
}