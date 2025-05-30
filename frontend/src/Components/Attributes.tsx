import type {Attribute} from "../Types/ProductTypes";
import AttributeSelector from "./AttributeSelector.tsx";
import {useState} from "react";

export default function Attributes({ items }: { items: Attribute[] }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="my-6">
            {items.map((attribute) => (
                <div key={attribute.id} className="mb-4">
                    <h3 className="text-lg font-semibold">{`${(attribute.name).toUpperCase()}:`}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {attribute.items.map((item) => (
                            <AttributeSelector
                                key={item.id}
                                id={item.id}
                                type={attribute.type}
                                itemValue={item.value}
                                itemDisplayValue={item.displayValue}
                                selectedId={selectedId}
                                onSelect={(id) => setSelectedId(id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}