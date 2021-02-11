/**
 * This script will display all order upon a page loaded, and handle functionality of order page.
 */
$(document).ready(() => {
    // For some reasons, session storage also has key which is a log from external plugins(?).
    // Use filter to prevent it.
    let totalPrice = 0;
    let orderTable = $("#order-table");
    /**
     * Create order table based on order.
     */
    Object.keys(sessionStorage).filter(key => !isNaN(key)).forEach(key => {
        let orderInJson = JSON.parse(sessionStorage.getItem(key));
        orderTable.append(
            "<tr>"
            + "<th scope='row'>"
            + "<!-- Dropleft button to show order information -->"
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
            + "<p>" + orderInJson.total + "</p>"
            + "</td>"

            + "<td>"
            + "<img src='assets/image/order-remove.svg' onclick='removeOrder(" + key + ")'>" // Pass key along the way so it can detect the order.
            + "</td>"

            + "<td>"
            + "<input type='checkbox' class='btn-check' name='order-remove-multiple'autocomplete='off' style='margin-left: 20px;' onchange='storeChoice(this," + key + ")'>"
            + "</td>"
            + "</tr>");

            totalPrice += parseFloat(orderInJson.total.substring(1));
    })

    orderTable.append(
        "<tr>"
        + "<th scope='row'>"
        + "<p>Total</p>"
        + "</th>"

        + "<td colspan='2'>"
        + "<p>$" + totalPrice.toFixed(2) + "</p>"
        + "</td>"

        + "<td colspan='1'>"
        + "<button type='button' class='btn btn-danger' onclick='removeMultipleOrders()'>Remove selected orders</button>"
        + "</td>"
        + "</tr>"
    );

    document.getElementById("button-reset").addEventListener("click", () => reset());

    function reset() {
        sessionStorage.clear();
        location.reload();
    }
});

/**
 * Remove a specific order from session storage.
 * @param {float} orderKey 
 */
function removeOrder(orderKey) {
    sessionStorage.removeItem(orderKey);
    location.reload();
}

let choice = [];
/**
 * Remove selected orders from session storage.
 */
function removeMultipleOrders() {
    choice.forEach(element => {
        sessionStorage.removeItem(element);
    })
    location.reload();
}

/**
 * Store respective order key of checked box so they can be removed later.
 * @param {html input tag} checkbox 
 * @param {float} orderKey 
 */
function storeChoice(checkbox, orderKey) {
    if(checkbox.checked) {
        choice.push(orderKey);
    } else {
        const index = choice.indexOf(orderKey); // Remove from list when uncheck box
        if (index > -1) {
            choice.splice(index, 1);
        }
    }
}

