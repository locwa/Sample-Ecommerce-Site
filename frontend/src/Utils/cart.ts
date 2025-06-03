import type {Attribute} from "../Types/Attribute";

let id = 0;
let selectedAttributes : object = [];
let attributeChecker : boolean = false;

export function addToCart (name : string, price : number, currency : string, attributes: Attribute[]) {
    if (attributeChecker) {
        let item = {
            name: name,
            price: price,
            currency: currency,
            selectedAttributes: selectedAttributes,
            productAttributes: attributes
        };
        localStorage.setItem(id.toString(), JSON.stringify(item))
        id++
        return true;
    } else {
        return false;
    }
}

export function setAttributes(attributes : object, objectCount : number) {
    const attributeCount = Object.keys(attributes).length;

    if (attributeCount === objectCount){
        selectedAttributes = attributes;
        attributeChecker = true;
    } else {
        attributeChecker = false;
    }

}
export function getCart(){
    let cart = []
    for (let i = 0; i < localStorage.length; i++){
        let item = localStorage.getItem(i.toString());
        if (item !== null) {
            cart.push(JSON.parse(item));
        }
    }
    return (cart);
}