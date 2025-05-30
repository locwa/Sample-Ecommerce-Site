import type {Attribute} from "../Types/ProductTypes";
import AttributeSelector from "./AttributeSelector.tsx";
import {useState} from "react";

export default function Attributes({ items }: { items: Attribute[] }) {
    const [selectedByAttr, setSelectedByAttr] = useState<Record<string, string | null>>({});

    const handleSelect = (attributeId: string, itemId: string) => {
        setSelectedByAttr((prev) => ({
            ...prev,
            [attributeId]: itemId,
        }));
    };

    return (
        <div className="my-6">
            {items.map((attr) => (
                <div key={attr.id} className="mb-4">
                    <h3 className="text-lg font-semibold">{`${(attr.name).toUpperCase()}:`}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {attr.items.map((item) => (
                            <AttributeSelector
                                key={item.id}
                                id={item.id}
                                type={attr.type}
                                itemValue={item.value}
                                itemDisplayValue={item.displayValue}
                                selectedId={selectedByAttr[attr.id] || null}
                                onSelect={() => handleSelect(attr.id, item.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}