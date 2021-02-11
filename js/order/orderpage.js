/**
 * This script will display tally and update it in real time
 */

// Wait till the page fully loaded so we can access list properly
$(document).ready(() => {
    // Using array/object to pass by reference.
    let breadType = [""]; // Name of choice.
    let meatType = [""];
    let sizeType = [""];
    let toppingPriceList = {
        "topping-cheddar": 0, "topping-mozzarella": 0,
        "topping-english": 0, "topping-feta": 0,
        "topping-spinach": 0, "topping-carrot": 0,
        "topping-sprout": 0, "topping-pickle": 0
    };
    let specialToppingPriceList = { 
        "special-topping-hanabero": 0, "special-topping-bbq": 0, "special-topping-garlic": 0, "special-topping-mayonnaise": 0 
    };

    let breadPrice = [0]; // Price of the category.
    let meatPrice = [0];
    let toppingPrice = [0];
    let specialToppingPrice = [0];
    let sizePrice = [0];
    let quantity = 1;
    let orderName = "";
    
    let quantityInput = document.getElementById("quantity-customization")
    let total = document.getElementById("total-customization");
    let orderNameInput = document.getElementById("name-customization")
    let orderNo = 0; // Counter to keep track of order in session storage.

    // Add listener to keys.
    let bread = document.getElementsByName("bread-option");
    addListenerForRadio(bread, breadPrice, breadType);
    let meat = document.getElementsByName("meat-option");
    addListenerForRadio(meat, meatPrice, meatType);
    let topping = document.getElementsByName("topping-option");
    addListenerForCheckBox(topping, toppingPriceList, toppingPrice);
    let specialTopping = document.getElementsByName("special-topping-option");
    addListenerForCheckBox(specialTopping, specialToppingPriceList, specialToppingPrice);
    let size = document.getElementsByName("size-option");
    addListenerForRadio(size, sizePrice, sizeType);
    quantityInput.addEventListener("input", event => {
        quantity = quantityInput.value;
        if (quantity < 1) quantity = 1; // Min quantity is 1
        total.innerHTML = "$" + getTotal();
    });
    orderNameInput.addEventListener("input", event => {
        orderName = orderNameInput.value;
    });
    document.getElementById("button-reset").addEventListener("click", event => {
        reset();
    })

    document.getElementById("button-add-to-cart").addEventListener("click", event => {
        addToCart();
    })

    /**
     * Get price of a choice.
     * @param {string} id 
     */
    function getPrice(id) {
        return parseFloat($(id).next().text().substring(1));
    }

    /**
     * Get name of a choice.
     * @param {string} id 
     */
    function getName(id) {
        return $(id).next().next().text();
    }

    /**
     * Get total price in real time.
     */
    function getTotal() {
        return ((breadPrice[0] + meatPrice[0] + toppingPrice[0] + specialToppingPrice[0] + sizePrice[0]) * quantity).toFixed(2).toString();
    }

    /**
     * This function will add listener to radio button options, so it can react upon user's choice.
     * @param {NodeList} buttonGroup 
     * @param {Array} respectivePrice 
     * @param {Array} respectiveType
     */
    function addListenerForRadio(buttonGroup, respectivePrice, respectiveType = null) {
        [].forEach.call(buttonGroup, element => {
            element.addEventListener("change", event => {
                let id = "#" + element.id;
                respectivePrice[0] = getPrice(id);
                total.innerHTML = "$" + getTotal();
                if (respectiveType !== null) { // Only use for bread, meat, and size.
                    respectiveType[0] = getName(id);
                }
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
                for (const key in respectivePriceList) {
                    respectivePrice[0] += respectivePriceList[key];
                }
                total.innerHTML = "$" + getTotal();
            })
        })
    }

    /**
     * This function will clear customized sandwich form.
     */
    function reset() {
        breadPrice[0] = 0;
        meatPrice[0] = 0;
        toppingPriceList = {
            "topping-cheddar": 0, "topping-mozzarella": 0,
            "topping-english": 0, "topping-feta": 0,
            "topping-spinach": 0, "topping-carrot": 0,
            "topping-sprout": 0, "topping-pickle": 0
        };
        toppingPrice[0] = 0;
        specialToppingPriceList = { "special-topping-hanabero": 0, "special-topping-bbq": 0, "special-topping-garlic": 0, "special-topping-mayonnaise": 0 };
        specialToppingPrice[0] = 0;
        sizePrice[0] = 0;
        quantity = 1;
        total.innerHTML = "$0.00";
        let input = document.getElementsByTagName("input");
        [].forEach.call(input, element => {
            element.checked = false;
            element.value = null;
        });
    }

    /**
     * This functions handle add to cart button on customized sandwich page.
     */
    function addToCart() {
        // See if the order is properly filled, if not, display an alert.
        let isBreadFilled = false;
        let isMeatFilled = false;
        let isToppingFilled = false;
        let isSpecialToppingFilled = false;
        let isSizeFilled = false;
        let isQuantityFilled = false;
        let isOrderNameFilled = false;
        [].forEach.call(bread, element => {if(element.checked) isBreadFilled = true});
        [].forEach.call(meat, element => {if(element.checked) isMeatFilled = true});
        [].forEach.call(topping, element => {if(element.checked) isToppingFilled = true});
        [].forEach.call(specialTopping, element => {if(element.checked) isSpecialToppingFilled = true});
        [].forEach.call(size, element => {if(element.checked) isSizeFilled = true});
        if(quantityInput.value !== null && quantityInput !== "") isQuantityFilled = true;
        if(orderNameInput.value !== null && orderNameInput.value !== "") isOrderNameFilled = true;
        if (!(isBreadFilled && isMeatFilled && isOrderNameFilled && isToppingFilled 
            && isSpecialToppingFilled && isSizeFilled && isQuantityFilled && isOrderNameFilled)) {
                alert("Please fully fill in an order to continue.");
                return;
        }

        // Create a json for the order info.
        let order = new OrderObject(breadPrice[0], meatPrice[0], toppingPriceList, toppingPrice[0], specialToppingPriceList, 
            specialToppingPrice[0], sizePrice[0], quantity, total.innerHTML, orderName, breadType, meatType, sizeType);
        order.initToppingType();
        order.initSpecialToppingType();
        let orderInfoInJson = JSON.stringify(order);

        // Save in session storage.
        sessionStorage.setItem(orderNo.toString(), orderInfoInJson);
        orderNo ++; // Use number as a standardized way to lookup session storage. Not optimal, but work for demo-ing purpose.
                    // may need another counter to keep track of amount of order
        reset();
        console.log(orderInfoInJson);
        // console.log(sessionStorage)
    }

})



