class OrderObject {
    constructor(breadPrice, meatPrice, toppingPriceList, toppingPrice, specialToppingPriceList, specialToppingPrice, sizePrice, quantity, total, name) {
        this.breadPrice = [breadPrice];
        this.meatPrice = [meatPrice];
        this.toppingPriceList = toppingPriceList
        this.toppingPrice = [toppingPrice];
        this.specialToppingPriceList = specialToppingPriceList;
        this.specialToppingPrice = [specialToppingPrice];
        this.sizePrice = [sizePrice];
        this.quantity = quantity;
        this.total = total;
        this.name = name;
    }
}