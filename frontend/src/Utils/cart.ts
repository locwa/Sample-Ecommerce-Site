import type {Attribute} from "../Types/Attribute";

let selectedAttributes : object = [];
let attributeChecker : boolean = false;

export function addToCart (name : string, price : number, currency : string, attributes: Attribute[], photo : string) {
    localStorage.removeItem("loglevel")
    let id = Date.now()
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
    localStorage.removeItem("loglevel")
    let cart = []
    const keys = Object.keys(localStorage).sort()
    for (let i = 0; i < keys.length; i++){
        let item = localStorage.getItem(keys[i]);
        if (item !== null) {
            cart.push(JSON.parse(item));
        }
    }
    return (cart);
}

export function cartTotal() {
    localStorage.removeItem("loglevel")
    let total = 0;
    let currency = "";
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        if (key != null) {
            let itemObj = localStorage.getItem(key);
            if (itemObj !== null) {
                let item = JSON.parse(itemObj);
                total += item.price * item.quantity;
                currency = item.currency
            }
        }
    }
    return `${currency}${total.toFixed(2)}`;
}

export function getSelectedAttributeItem(attrType : string, index: number) {
    localStorage.removeItem("loglevel")
    const keys = Object.keys(localStorage).sort()
    try {
        const storage = localStorage.getItem(keys[index])
        if (storage != null) {
            const cart = JSON.parse(storage);
            return cart['selectedAttributes'][attrType];
        }
    } catch (err) {
        console.error("Error parsing cart from localStorage", err);
    }
}