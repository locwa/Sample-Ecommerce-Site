
import type {AttributeSelector} from "../Types/AttributeSelector";

export default function AttributeSelector({id, type, itemValue, itemDisplayValue, selectedId, onSelect, size} : AttributeSelector) {
    const isSelected = selectedId === id;

    let toggleStylingText = "";
    let toggleStylingSwatch = "";
    let colorSwatch = ""

    if (size === "md") {
        toggleStylingText = isSelected ? "bg-black text-white px-5 py-3" : "bg-gray-100 px-5 py-3";
        toggleStylingSwatch = isSelected ? "border border-[#5ECE7B] w-8 h-8" : "w-8 h-8";
        colorSwatch = "w-7 h-7 p-1"
    } else if (size === "sm") {
        toggleStylingText = isSelected ? "bg-black text-white px-3 py-1" : "bg-gray-100 px-3 py-1";
        toggleStylingSwatch = isSelected ? "border border-[#5ECE7B] w-6 h-6" : "w-6 h-6";
        colorSwatch = "w-5 h-5 p-1"
    }

    return type === 'text' ? (
        <button
            key={id}
            className={"border text-sm hover:cursor-pointer " + toggleStylingText}
            onClick={() => onSelect(id)}
        >
            {type === 'text' ? itemDisplayValue : ""}
        </button>
    ) : (
        <button
            key={id}
            className={"flex items-center justify-center hover:cursor-pointer " + toggleStylingSwatch}
            onClick={() => onSelect(id)}
        >
            <div
                className={colorSwatch}
                style={{backgroundColor: itemValue}}
            />
        </button>
    )
}