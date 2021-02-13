class OrderObject {
    constructor(breadPrice, meatPrice, toppingPriceList, toppingPrice, specialToppingPriceList, specialToppingPrice, sizePrice, quantity, total, name,
        breadType, meatType, sizeType) {
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

        this.breadType = breadType;
        this.meatType = meatType;
        this.sizeType = sizeType;
        this.toppingType = [];
        this.specialToppingType = [];
    }

    /**
     * This function create a name list of chosen topping.
     */
    initToppingType() {
        for (const key in this.toppingPriceList) {
            if (this.toppingPriceList[key] !== 0) {
                this.toppingType.push($("#" + key).next().next().text());
            }
        }
    }

    /**
     * This function create a name list of chosen topping name.
     */
    initSpecialToppingType() {
        for (const key in this.specialToppingPriceList) {
            if (this.specialToppingPriceList[key] !== 0) {
                this.specialToppingType.push($("#" + key).next().next().text());
            }
        }
    }
}