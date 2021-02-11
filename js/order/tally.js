/**
 * This script will display tally and update it in real time
 */

// Wait till the page fully loaded so we can access list properly
$(document).ready(() => {
    // Using array/object to pass by reference.
    let breadPrice = [0];
    let meatPrice = [0];
    let toppingPriceList = {"topping-cheddar": 0, "topping-mozzarella": 0, 
                        "topping-english": 0, "topping-feta": 0, 
                        "topping-spinach": 0, "topping-carrot": 0, 
                        "topping-sprout": 0, "topping-pickle": 0};
    let toppingPrice = [0];
    let specialToppingPriceList = {"special-topping-hanabero": 0, "special-topping-bbq": 0, "special-topping-garlic": 0, "special-topping-mayonnaise": 0};
    let specialToppingPrice = [0];
    let sizePrice = [0];
    let quantity = 1;
    let total = document.getElementById("total-customization");

    let bread = document.getElementsByName("bread-option");
    addListenerForRadio(bread, breadPrice);

    let meat = document.getElementsByName("meat-option");
    addListenerForRadio(meat, meatPrice);


    let topping = document.getElementsByName("topping-option");
    addListenerForCheckBox(topping, toppingPriceList, toppingPrice);


    let specialTopping = document.getElementsByName("special-topping-option");
    addListenerForCheckBox(specialTopping, specialToppingPriceList, specialToppingPrice);


    let size = document.getElementsByName("size-option");
    addListenerForRadio(size, sizePrice);

    document.getElementById("quantity-customization").addEventListener("input", event => {
        quantity = document.getElementById("quantity-customization").value;
        if (quantity < 1) quantity = 1; // Min quantity is 1
        total.innerHTML = "$" + getTotal();
    });

    function getPrice(id) {
        return parseFloat($(id).next().text().substring(1));
    }
    function getTotal() {
        return ((breadPrice[0] + meatPrice[0] + toppingPrice[0] + specialToppingPrice[0] + sizePrice[0]) * quantity).toFixed(2).toString();
    }

    /**
     * This function will add listener to radio button options, so it can react upon user's choice.
     * @param {NodeList} buttonGroup 
     * @param {Array} respectivePrice 
     */
    function addListenerForRadio(buttonGroup, respectivePrice) {
        [].forEach.call(buttonGroup, element => {
            element.addEventListener("change", event => {
                let id = "#" + element.id;
                respectivePrice[0] = getPrice(id);
                total.innerHTML = "$" + getTotal();
            })
        })
    }

    /**
     * This function will add listener to checkbox button options, so it can react upon user's choice.
     * @param {NodeList} buttonGroup 
     * @param {Map} respectivePriceList 
     */
    function addListenerForCheckBox(buttonGroup, respectivePriceList, respectivePrice) {
        [].forEach.call(buttonGroup, element => {
            element.addEventListener("input", event => {
                let id = element.id;
                if (element.checked) {
                    respectivePriceList[id] = getPrice("#" + id);
                } else {
                    respectivePriceList[id] = 0;
                }
                respectivePrice[0] = 0;
                for (let key in respectivePriceList) {
                    respectivePrice[0] += respectivePriceList[key];
                }
                total.innerHTML = "$" + getTotal();
            })
        })

    }
})



