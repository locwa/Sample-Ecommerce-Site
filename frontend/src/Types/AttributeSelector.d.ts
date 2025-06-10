export type AttributeSelector = {
    id: string;
    type: string;
    itemValue: string;
    selectedId: string | null;
    onSelect: (id) => string | void;
    mode: string;
    attrId?: string;
}