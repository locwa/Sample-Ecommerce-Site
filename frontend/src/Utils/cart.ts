import type {Attribute} from "../Types/Attribute";

let selectedAttributes : object = [];
let attributeChecker : boolean = false;

export function addToCart (name : string, price : number, currency : string, attributes: Attribute[], photo : string) {
    let id = localStorage.length;
    if (attributeChecker) {
        let item = {
            name: name,
            price: price,
            currency: currency,
            selectedAttributes: selectedAttributes,
            productAttributes: attributes,
            quantity: 1,
            photo: photo
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

export function cartTotal() {
    let total = 0;
    let currency = "";
    for (let i = 0; i < localStorage.length; i++){
        let itemObj = localStorage.getItem(i.toString());
        if (itemObj !== null) {
            let item = JSON.parse(itemObj);
            total += item.price * item.quantity;
            currency = item.currency
        }
    }
    return `${currency}${total}`;
}