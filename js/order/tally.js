/**
 * This script will display tally and update it in real time
 */

// Wait till the page fully loaded so we can access list properly
$(document).ready  (() => {
    // Using array to pass by reference.
    let breadPrice = [0];
    let meatPrice = [0];
    let toppingPrice = [0];
    let specialToppingPrice = [0];
    let sizePrice = [0];
    let quantity = 1;
    let total = document.getElementById("total-customization");

    let bread = document.getElementsByName("bread-option");
    addListener(bread, breadPrice);

    let meat = document.getElementsByName("meat-option");
    addListener(meat, meatPrice);


    let topping = document.getElementsByName("topping-option");
    addListener(topping, toppingPrice);


    let specialTopping = document.getElementsByName("special-topping-option");
    addListener(specialTopping, specialToppingPrice);


    let size = document.getElementsByName("size-option");
    addListener(size, sizePrice);

    document.getElementById("quantity-customization").addEventListener("input", event => {
        quantity = document.getElementById("quantity-customization").value;
        total.innerHTML = "$" + getTotal();
    });

    function getPrice(id) {
        return parseFloat($(id).next().text().substring(1));
    }
    function getTotal() {
        return ((breadPrice[0] + meatPrice[0] + toppingPrice[0] + specialToppingPrice[0] + sizePrice[0]) * quantity).toFixed(2).toString();
    }

    /**
     * This function will add listener to order options, so it can react upon user's choice.
     * @param {NodeList} buttonGroup 
     * @param {Array} respectivePrice 
     */
    function addListener(buttonGroup, respectivePrice) {
        [].forEach.call(buttonGroup, element => {
            element.addEventListener("change", event => {
                let id = "#" + element.id;
                respectivePrice[0] = getPrice(id);
                total.innerHTML = "$" + getTotal();
            })
        })
    }
})



