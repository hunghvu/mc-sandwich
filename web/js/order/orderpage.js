/**
 * This script will display tally and update it in real time.
 * It also provides handler for buttons on this page.
 */

// Wait till the page fully loaded so we can access list properly
window.onload = () => {

    /**
     * Display logged username on top right.
     */
    let username = sessionStorage.getItem("username");
    if (username) {
        $("#button-signin").css({
            "visibility": "hidden",
        });
        $("#button-register").css({
            "visibility": "hidden",
        });
        $(  "<div class='dropdown' style='margin-top: 4px'>"
            +"<button class='dropdown-toggle' data-toggle='dropdown' type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + username + "!</button>"
            +"<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"
            +"<a class='dropdown-item' href='../profile'>Profile</a>"
            +"</div>"
        ).insertAfter($("#button-register"));
        $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));
    }

    // Populate customized page if navigate form cart.
    let params = new URLSearchParams(window.location.search);
    let orderState = sessionStorage.getItem(params.get("order"));
    // console.log(orderState);
    console.log(params);
    console.log(params.get("order"));
    console.log(orderState);
    if (orderState) {
        let orderInJson = JSON.parse(orderState);
        Object.keys(orderInJson).forEach(key => {
            let orderChoice = document.getElementById(key.toString());
            //Must access json val via [] for some reasons, maybe because of "-" in key name?
            if (orderInJson[key] === true) {
                orderChoice.checked = true;
            } else {
                orderChoice.value = orderInJson[key];
            }
        })
    }

    // console.log(sessionStorage);
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

    let quantityInput = document.getElementById("quantity-customization");
    let total = document.getElementById("total-customization");
    let orderNameInput = document.getElementById("name-customization");

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

    // Pre-check to in case the page is pre-populated.
    if (quantityInput.value !== null && quantityInput.value !== "") {
        quantity = quantityInput.value;
        if (quantity < 1) quantity = 1; // Min quantity is 1
        total.innerHTML = "$" + getTotal();
    }
    quantityInput.addEventListener("input", event => {
        quantity = quantityInput.value;
        if (quantity < 1) quantity = 1; // Min quantity is 1
        total.innerHTML = "$" + getTotal();
    });
    // Pre-check to in case the page is pre-populated.
    if (orderNameInput.value !== null && orderNameInput.value !== "") {
        orderName = orderNameInput.value;
    }

    // Use different listener for "None" choice.
    document.getElementById("topping-none").addEventListener("input", event => {
        for (let i = 0; i < topping.length; i++) { // Can't use for each in here.
            if (topping[i].id !== "topping-none" && document.getElementById("topping-none").checked === true) {
                topping[i].checked = false;
                topping[i].disabled = true;
                for (const key in toppingPriceList) {
                    toppingPriceList[key] = 0;
                }
                toppingPrice[0] = 0;
                total.innerHTML = "$" + getTotal();
            } else {
                topping[i].disabled = false;
            }
        }
    })

    // Use different listener for "None" choice.
    document.getElementById("special-topping-none").addEventListener("input", event => {
        for (let i = 0; i < specialTopping.length; i++) { // Can't use for each in here.
            if (specialTopping[i].id !== "special-topping-none" && document.getElementById("special-topping-none").checked === true) {
                specialTopping[i].checked = false;
                specialTopping[i].disabled = true;
                for (const key in specialToppingPriceList) {
                    specialToppingPriceList[key] = 0;
                }
                specialToppingPrice[0] = 0;
                total.innerHTML = "$" + getTotal();
            } else {
                specialTopping[i].disabled = false;
            }
        }
    })
    orderNameInput.addEventListener("input", event => {
        orderName = orderNameInput.value;
    });
    document.getElementById("button-reset").addEventListener("click", event => {
        reset();
    })

    document.getElementById("button-add-to-cart").addEventListener("click", event => {
        addToCart();
    })

    // Add listener for quickorder button.
    let buttonClub = document.getElementById("button-club");
    let buttonChicken = document.getElementById("button-chicken");
    let buttonHam = document.getElementById("button-ham");
    let buttonVegwich = document.getElementById("button-vegwich");
    buttonClub.addEventListener("click", () => quickOrder(buttonClub));
    buttonChicken.addEventListener("click", () => quickOrder(buttonChicken));
    buttonHam.addEventListener("click", () => quickOrder(buttonHam));
    buttonVegwich.addEventListener("click", () => quickOrder(buttonVegwich));

    /**
     * Get price of a choice.
     * @param {string} id id of an element
     */
    function getPrice(id) {
        return parseFloat($(id).next().text().substring(1));
    }

    /**
     * Get name of a choice.
     * @param {string} id id of an element
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
     * @param {NodeList} buttonGroup a radio button group
     * @param {Array} respectivePrice a price of given choice
     * @param {Array} respectiveType a type of given choice
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
        });
        // Pre-check to in case the page is pre-populated.
        [].forEach.call(buttonGroup, element => {
            if (element.checked) {
                let id = "#" + element.id;
                respectivePrice[0] = getPrice(id);
                total.innerHTML = "$" + getTotal();
                if (respectiveType !== null) { // Only use for bread, meat, and size.
                    respectiveType[0] = getName(id);
                }
            }
        })
    }

    /**
     * This function will add listener to checkbox button options, so it can react upon user's choice.
     * @param {NodeList} buttonGroup a checkbox group
     * @param {Map} respectivePriceList a respective price list of the whole checkbox group
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
                // console.log(respectivePriceList)
            })
        });
        // Weird behavior, can't put anything here (before []) or there will be a compiled error.
        // Pre-check to in case the page is pre-populated.
        [].forEach.call(buttonGroup, element => {
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

    }

    /**
     * This function will clear customized sandwich form.
     * Reset content, not reassign, or else will lose their reference.
     */
    function reset() {
        breadType[0] = ""; // Name of choice.
        meatType[0] = "";
        sizeType[0] = "";
        for (const key in toppingPriceList) {
            toppingPriceList[key] = 0;
        }
        for (const key in specialToppingPriceList) {
            specialToppingPriceList[key] = 0;
        }

        breadPrice[0] = 0; // Price of the category.
        meatPrice[0] = 0;
        toppingPrice[0] = 0;
        specialToppingPrice[0] = 0;
        sizePrice[0] = 0;
        quantity = 1;
        orderName = "";
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
        let saveHtml = {}; // Used to populate page later on.
        // Save choices and check if all categories already have a choice.
        [].forEach.call(bread, element => {
            if (element.checked) {
                isBreadFilled = true;
                saveHtml[element.id] = true;
            }
        });
        [].forEach.call(meat, element => {
            if (element.checked) {
                isMeatFilled = true;
                saveHtml[element.id] = true;
            }
        });
        [].forEach.call(topping, element => {
            if (element.checked) {
                isToppingFilled = true;
                saveHtml[element.id] = true;
            }
        });
        [].forEach.call(specialTopping, element => {
            if (element.checked) {
                isSpecialToppingFilled = true;
                saveHtml[element.id] = true;
            }
        });
        [].forEach.call(size, element => {
            if (element.checked) {
                isSizeFilled = true;
                saveHtml[element.id] = true;
            }
        });
        if (quantityInput.value !== null && quantityInput.value !== "") {
            isQuantityFilled = true;
            saveHtml[quantityInput.id] = quantityInput.value;
        }
        if (orderNameInput.value !== null && orderNameInput.value !== "") {
            isOrderNameFilled = true;
            saveHtml[orderNameInput.id] = orderNameInput.value;
        }
        if (!(isBreadFilled && isMeatFilled && isOrderNameFilled && isToppingFilled
            && isSpecialToppingFilled && isSizeFilled && isQuantityFilled && isOrderNameFilled)) {
            alert("Please fully fill in an order to continue.");
            return;
        }
        // console.log(specialToppingPriceList);
        // Create a json for the order info.
        let order = new OrderObject(breadPrice[0], meatPrice[0], toppingPriceList, toppingPrice[0], specialToppingPriceList,
            specialToppingPrice[0], sizePrice[0], quantity, total.innerHTML, orderName, breadType, meatType, sizeType);
        order.initToppingType();
        order.initSpecialToppingType();
        let orderInfoInJson = JSON.stringify(order);

        // Save in session storage.
        if (params.get("order")) { // Overwrite old order inside session storage
            let stateComponent = params.get("order").split("-");
            // console.log(stateComponent[1])
            sessionStorage.setItem(stateComponent[1], orderInfoInJson);
            sessionStorage.setItem(params.get("order"), JSON.stringify(saveHtml))
            // console.log(sessionStorage)
        } else { // Add a new order
            let storageKey = Math.random();
            if (sessionStorage.getItem(storageKey.toString())) {
                storageKey = Math.random();
            }
            sessionStorage.setItem(storageKey.toString(), orderInfoInJson);

            // Save html state (choices).
            sessionStorage.setItem("state-" + storageKey.toString() + "-" + orderName.toString(), JSON.stringify(saveHtml));
        }

        reset();

    }

    /**
     * This function handles buttons on quick order tab.
     * @param {HTML button} button 
     */
    function quickOrder(button) {
        // Error prone due to too many <br> in the middle. 
        // However, this one will mainly be hard-coded for demo purpose.
        // Temporarily disable auto page populate for quick order.
        let quickOrderName = $("#" + button.id).parent().prev().prev().prev()
        let quickOrderQuantity = $("#" + button.id).parent().prev()
            .prev().prev().prev().prev()
            .prev().prev()
        if (!(quickOrderName.val() !== null && quickOrderName.val() !== ""
            && quickOrderQuantity.val() !== null && quickOrderQuantity.val() !== ""
            && quickOrderQuantity.val() !== undefined && quickOrderName.val() !== undefined)) {
            alert("Please fill in a quantity and an order name first.");
            return;
        }

        let orderInfoInJson = null;
        if (button === document.getElementById("button-club")) {
            toppingPriceList["topping-cheddar"] = 1.99;
            specialToppingPriceList["special-topping-hanabero"] = 0.49;
            let order = new OrderObject(0.99, 3.99, toppingPriceList, 1.99, specialToppingPriceList,
                0.49, 0.49, quickOrderQuantity.val(), "$" + 7.95 * quickOrderQuantity.val(), quickOrderName.val(), "Wheat Bread", "Beef", "Small");
            order.initToppingType();
            order.initSpecialToppingType();
            orderInfoInJson = JSON.stringify(order);
        }

        if (button === document.getElementById("button-chicken")) {
            toppingPriceList["topping-english"] = 3.99;
            specialToppingPriceList["special-topping-garlic"] = 0.00;
            let order = new OrderObject(1.49, 1.99, toppingPriceList, 3.99, specialToppingPriceList,
                0.00, 1.99, quickOrderQuantity.val(), "$" + 9.46 * quickOrderQuantity.val(), quickOrderName.val(), "White Bread", "Chicken", "Large");
            order.initToppingType();
            order.initSpecialToppingType();
            orderInfoInJson = JSON.stringify(order);
        }

        if (button === document.getElementById("button-ham")) {
            toppingPriceList["topping-mozzarella"] = 2.99;
            specialToppingPriceList["special-topping-hanabero"] = 0.00;
            let order = new OrderObject(0.99, 2.99, toppingPriceList, 2.99, specialToppingPriceList,
                0.00, 1.49, quickOrderQuantity.val(), "$" + 8.46 * quickOrderQuantity.val(), quickOrderName.val(), "Malted Rye", "Pork", "Medium");
            order.initToppingType();
            order.initSpecialToppingType();
            orderInfoInJson = JSON.stringify(order);
        }

        if (button === document.getElementById("button-vegwich")) {
            toppingPriceList["topping-pickle"] = 0.99;
            specialToppingPriceList["special-topping-mayonnaise"] = 0.99;
            let order = new OrderObject(1.99, 0.00, toppingPriceList, 0.99, specialToppingPriceList,
                0.99, 1.49, quickOrderQuantity.val(), "$" + 5.46 * quickOrderQuantity.val(), quickOrderName.val(), "Italian Herb & Cheese", "None", "Medium");
            order.initToppingType();
            order.initSpecialToppingType();
            orderInfoInJson = JSON.stringify(order);
        }

        if (params.get("order")) { //Overwrite old order
            let stateComponent = params.get("order").split("-");
            // console.log(stateComponent[1])
            sessionStorage.setItem(stateComponent[1], orderInfoInJson);

            console.log(sessionStorage)
        } else { // Add a new order
            let storageKey = Math.random();
            if (sessionStorage.getItem(storageKey.toString())) {
                storageKey = Math.random();
            }
            sessionStorage.setItem(storageKey.toString(), orderInfoInJson);
        }

    }


}




