/**
 * This script will display all order upon a page loaded, and handle functionalites of order page.
 * The functionalities includes add, remove order, change name, confirm and place order, etc.
 */
$(document).ready(() => {

    /**
     * Display logged username on top right.
     */
    if (sessionStorage.getItem("username")) {
        $("#button-signin").css({
            "visibility": "hidden",
        });
        $("#button-register").css({
            "visibility": "hidden",
        });
        $("<button type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + sessionStorage.getItem("username") + "!</button>").insertAfter($("#button-register"));
        $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));
    }

    // For some reasons, session storage also has key which is a log from external plugins like LiveServer(?).
    // Use filter to prevent it.
    let totalPrice = 0;
    let orderTable = $("#order-table");
    /**
     * Create order table based on order.
     */
    // console.log(Object.keys(sessionStorage))
    Object.keys(sessionStorage).filter(key => !isNaN(key)).forEach(key => {
        let orderInJson = JSON.parse(sessionStorage.getItem(key)); // Object is saved as string in storage
        // console.log(key)
        // console.log(orderInJson.name)
        orderTable.append(
            "<tr>"
            + "<th scope='row'>"
            + "<!-- Dropleft button to show order information -->"
            + "<div name='order-info'>" // Group the buttons to display in order review later.
            + "<div class='btn-group dropleft'>"
            + "<button type='button' class='btn btn-secondary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"
            + orderInJson.name
            + "</button>"
            + "<div class='dropdown-menu'>"
            + "<p>Bread type/price: "
            + orderInJson.breadType
            + "/$ "
            + orderInJson.breadPrice
            + "</p>"
            + "<div class='dropdown-divider'></div>"

            + "<p>Meat type/price: "
            + orderInJson.meatType
            + "/$ "
            + orderInJson.meatPrice
            + "</p>"
            + "<div class='dropdown-divider'></div>"

            + "<p>Topping type/price: "
            + orderInJson.toppingType
            + "/$ "
            + orderInJson.toppingPrice
            + "</p>"
            + "<div class='dropdown-divider'></div>"

            + "<p>Special topping type/price: "
            + orderInJson.specialToppingType
            + "/$ "
            + orderInJson.specialToppingPrice
            + "</p>"
            + "<div class='dropdown-divider'></div>"

            + "<p>Size type/price: "
            + orderInJson.sizeType
            + "/$ "
            + orderInJson.sizePrice
            + "</p>"
            + "<div class='dropdown-divider'></div>"

            + "<p>Quantity: "
            + orderInJson.quantity
            + "</p>"

            + "</div>"
            + "</div>"

            + "</th>"

            + "<td>"
            + "<p id='order-total-price'>" + orderInJson.total + "</p>"
            + "</td>"

            + "<td>"
            + "<img src='../image/order-remove.svg' onclick='removeOrder(" + key + ")'>" // Pass key along the way so it can detect the order.
            + "</td>"

            + "<td>"
            + "<input type='checkbox' class='btn-check' name='order-remove-multiple'autocomplete='off' style='margin-left: 20px;' onchange='storeRemoveChoice(this," + key + ")'>"
            + "</td>"

            + "<td>"
            + "<input type='text' onInput='storeNameChoice(this," + key + ")'>"
            + "</td>"

            + "<td>"
            + "<img src='../image/order-update.svg' onclick='navigateToOrderPage(" + key + ", \x22" + orderInJson.name + "\x22 )'>" // For some reason, cannot put string inside args
            // E.g: "state123" causes unexpected syntax err at line 1. => also cannot use order name which contains alpha character (html treat the char as a reference to the page)
            //  => non-existed reference causes bug, while number is implcitly converted to a string (coercion). => Need to put name inside quote.
            // The work around is using 2 args then process inside callee instead.
            + "</td>"

            + "<td>"
            + "<input type='checkbox' class='btn-check' name='order-favorite'autocomplete='off' style='margin-left: 20px;' onchange='storeFavoriteChoice(this," + key + ")'>"
            + "</td>"

            + "</tr>");

        totalPrice += parseFloat(orderInJson.total.substring(1));
        // console.log(key)
        // console.log(orderInJson.name)
    })

    orderTable.append(
        "<tr>"
        + "<th scope='row'>"
        + "<p>Total</p>"
        + "</th>"

        + "<td colspan='2'>"
        + "<p id='cart-total'>$" + totalPrice.toFixed(2) + "</p>"
        + "</td>"

        + "<td>"
        + "<button type='button' class='btn btn-danger' onclick='removeMultipleOrders()'>Remove selected orders</button>"
        + "</td>"

        + "<td colspan='2'>"
        + "<button type='button' class='btn btn-info' onclick='renameMultipleOrders()'>Rename selected orders</button>"
        + "</td>"

        + "<td>"
        + "<button type='button' class='btn btn-info' onclick='saveFavorites()'>Save Favorite orders</button>"
        + "</td>"
        + "</tr>"
    );

    document.getElementById("button-reset").addEventListener("click", () => reset());
    
    // Clear review order modal upon dismissal.
    $(".modal").on("hidden.bs.modal", function () {
        $("#order-review").html(""); // Weird behavior, fine to reset form, but reset model-body won't allow its child to be altered later on.
    });


});

/**
 * This function will reset session storage excluding current logged username.
 */
function reset() {
    for (key in sessionStorage) {
        if (key !== "username") sessionStorage.removeItem(key);
    };
    alert("Reset all orders successfully.");
    location.reload();
}

/**
 * Remove a specific order from session storage.
 * @param {string} orderKey a key of order inside session storage
 */
function removeOrder(orderKey) {
    sessionStorage.removeItem(orderKey);
    location.reload();
}

let removeChoice = []; // Store list of orders to be removed.
/**
 * Remove selected orders from session storage.
 */
function removeMultipleOrders() {
    removeChoice.forEach(element => {
        sessionStorage.removeItem(element);
    })
    location.reload();
}

/**
 * Store respective order key of checked box so they can be removed later.
 * @param {html input tag} checkbox reference to a checkbox
 * @param {string} orderKey a key of order inside session storage
 */
function storeRemoveChoice(checkbox, orderKey) {
    if (checkbox.checked) {
        removeChoice.push(orderKey);
    } else {
        const index = removeChoice.indexOf(orderKey); // Remove from list when uncheck box
        if (index > -1) {
            removeChoice.splice(index, 1);
        }
    }
}


let nameChoice = []; // List of orders and the new name associated with them.
/**
 * This function will rename multiple orders at once.
 */
function renameMultipleOrders() {
    for (key in nameChoice) {
        let toBeRenamed = JSON.parse(sessionStorage.getItem(key));
        
        // console.log(sessionStorage)
        let oldHtmlKey = "state-" + key + "-" + toBeRenamed.name; // Indicate key of old html state.
        toBeRenamed.name = nameChoice[key]; // Rename order
        let newHtmlKey = "state-" + key + "-" + nameChoice[key]; // New key of html state
        sessionStorage.setItem(key, JSON.stringify(toBeRenamed)); // Store order info, not html state.
        let oldHtmlState = JSON.parse(sessionStorage.getItem(oldHtmlKey)); // Old html state
        // console.log(oldHtmlState["name-customization"]);
        oldHtmlState["name-customization"] = toBeRenamed.name; // Change the information.
        sessionStorage.setItem(newHtmlKey, JSON.stringify(oldHtmlState)); // Store a new state since we cannot change key name
        sessionStorage.removeItem(oldHtmlKey); // Remove old html state.
        // console.log(sessionStorage);
        
        
    }
    location.reload();
}

/**
 * This function stores a new name of order and its respective order key.
 * @param {string} nameInput a reference to an input
 * @param {string} orderKey a key of order inside session storage
 */
function storeNameChoice(nameInput, orderKey) {
    nameChoice[orderKey] = nameInput.value;
}

/**
 * This function navigte a page from cart to order page.
 * This is used when a user want to update their other info.
 * The query is made in a way so order page recognize the respectivve 
 *  info inside session storage to populate the order page.
 * @param {string} orderKey a key of order to be updated inside session storage
 * @param {string} orderName a name of the order to be updated
 */
function navigateToOrderPage(orderKey, orderName) {
    // console.log(orderKey)
    let savedHtmlKey = "state-" + orderKey + "-" + orderName;
    window.location.href = "order.html?order=" + savedHtmlKey;
    // console.log(orderKey, orderName);
}

let favoriteChoice = {}; // An object store favorite choices of user, I use object so it can be stringified and stored.

/**
 * This function stores favorites some info of favorite orders inside session storage
 *   so they can be used later on if necessary.
 */
function saveFavorites() {
    if (!sessionStorage.getItem("username")) {
        alert("Please sign in first to use 'Favorite' feature");
        return;
    }
    sessionStorage.setItem("favorite", JSON.stringify(favoriteChoice));
    console.log(sessionStorage);
    alert("Save 'Favorites' sucessfullly. As of now it's save as a JSON string in session storage."
        + "This can be used in the future as the specification does not define behavior of 'Favorite'."
        + "The storage info is printed out in console if you want to check.");
}

/**
 * This functions store choice to a favoriteChoice object.
 * @param {*} checkbox 
 * @param {*} orderKey 
 */
function storeFavoriteChoice(checkbox, orderKey) {
    if (!sessionStorage.getItem("username")) {
        alert("Please sign in first to use 'Favorite' feature");
        checkbox.checked = false;
        return;
    }
    // console.log(sessionStorage.getItem("username"))
    if (checkbox.checked) {
        favoriteChoice[orderKey] = true;
    } else {
        favoriteChoice[orderKey] = false;
    }
}

/**
 * This function handle Place Order button (display review order).
 */
function placeOrder() {
    let orderInfo = document.getElementsByName("order-info");
    [].forEach.call(orderInfo, element => {
        // console.log(element);
        $("#order-review").append(
            "<div class='form-group'>"
            + element.outerHTML
            + "</div>"
        )
    })
    let copyTotal = document.getElementById("cart-total").cloneNode(true);
    copyTotal.id = "cart-total-review";
    copyTotal.innerHTML = "Total: " + copyTotal.innerHTML;
    // console.log(copyTotal);
    // console.log("order-total-price");
    $("#order-review").append(
        copyTotal.outerHTML
    )
}

/**
 * This function handles confirm order button.
 */
function acceptOrder() {
    if (!sessionStorage.getItem("username")) {
        alert("Please sign in to place order.");
        // return;
    } else if ((checkEmpty($("#order-fullname").val())
        || checkEmpty($("#order-address").val()))) {
        alert("Error: Empty field(s). Please enter all required information.")
    } else {
        alert("Order(s) placed succesfully. Cart cleared.")
        reset();
    }
}

