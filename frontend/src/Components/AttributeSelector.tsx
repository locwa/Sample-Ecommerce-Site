
import type {AttributeSelector} from "../Types/AttributeSelector";

export default function AttributeSelector({id, type, itemValue, itemDisplayValue, selectedId, onSelect} : AttributeSelector) {
    const isSelected = selectedId === id;

    const toggleStylingText = isSelected ? "bg-black text-white" : "bg-gray-100";
    const toggleStylingSwatch = isSelected ? "border border-[#5ECE7B]" : "";

        return type === 'text' ? (
            <button
                key={id}
                className={"px-5 py-3 border text-sm hover:cursor-pointer " + toggleStylingText}
                onClick={() => onSelect(id)}
            >
                {type === 'text' ? itemDisplayValue : ""}
            </button>
        ) : (
            <button
                key={id}
                className={"w-8 h-8 flex items-center justify-center hover:cursor-pointer " + toggleStylingSwatch}
                onClick={() => onSelect(id)}
            >
                <div
                    className={"w-7 h-7 p-1"}
                    style={{backgroundColor: itemValue}}
                />
            </button>
        )
}