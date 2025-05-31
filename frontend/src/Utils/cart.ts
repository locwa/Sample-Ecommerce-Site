let cart : object[] = [];
let selectedAttributes : object = [];
let attributeChecker : boolean = false;

export function addToCart (name : string, price : number, currency : string) {
    if (isAttributeComplete()) {
        let item = {
            name: name,
            price: price,
            currency: currency,
            selectedAttributes: getAttributes()
        };
        cart.push(item);
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

export function getAttributes() {
    return selectedAttributes;
}

export function getCart(){
    return cart;
}

export function isAttributeComplete() {
    return attributeChecker;
}