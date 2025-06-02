type Items = {
    displayValue: string;
    value: string;
    id: string;
}

export type Attribute = {
    id: string;
    items: Items[];
    name: string;
    type: string;
}