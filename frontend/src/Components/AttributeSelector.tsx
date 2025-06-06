
import type {AttributeSelector} from "../Types/AttributeSelector";

export default function AttributeSelector({id, type, itemValue, selectedId, onSelect, mode} : AttributeSelector) {
    const isSelected = selectedId === id;

    let toggleStylingText = "";
    let toggleStylingSwatch = "";
    let colorSwatch = ""

    if (mode === "productDetails") {
        toggleStylingText = isSelected ? "bg-black text-white px-5 py-3 hover:cursor-pointer" : "bg-gray-100 px-5 py-3 hover:cursor-pointer";
        toggleStylingSwatch = isSelected ? "border border-[#5ECE7B] w-8 h-8 hover:cursor-pointer" : "w-8 h-8 hover:cursor-pointer";
        colorSwatch = "w-7 h-7 p-1 border border-black"
    } else if (mode === "cart") {
        toggleStylingText = isSelected ? "bg-black text-white px-3 py-1" : "bg-gray-100 px-3 py-1";
        toggleStylingSwatch = isSelected ? "border border-[#5ECE7B] w-6 h-6" : "w-6 h-6";
        colorSwatch = "w-5 h-5 p-1 border border-black"
    }

    return type === 'text' ? (
        <button
            key={id}
            className={"border text-sm " + toggleStylingText}
            onClick={() => onSelect(id)}
        >
            {type === 'text' ? itemValue : ""}
        </button>
    ) : (
        <button
            key={id}
            className={"flex items-center justify-center " + toggleStylingSwatch}
            onClick={() => onSelect(id)}
        >
            <div
                className={colorSwatch}
                style={{backgroundColor: itemValue}}
            />
        </button>
    )
}