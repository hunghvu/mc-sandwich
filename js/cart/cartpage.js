/**
 * This script will display all order upon a page loaded.
 */
$(document).ready(() => {
    // For some reasons, session storage also has key which is a log from external plugins(?).
    // Use filter to prevent it.
    Object.keys(sessionStorage).filter(key => !isNaN(key)).forEach(key => {
        let orderInJson = JSON.parse(sessionStorage.getItem(key));
        // console.log(key);

        let orderTable = $("#order-table");
        // console.log(orderTable);
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
            + orderInJson.total
            + "</td>"
            + "</tr>")
    })


});


// "<!-- Dropleft button to show order information -->"
// + "<div class='btn-group dropleft'>"
//   + "<button type='button' class='btn btn-secondary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"
//     + orderInJson.name
//   + "</button>"
// + "<div class='dropdown-menu'>"
// +    "<p>abc</p>"
//   + "</div>"
// + "</div>"
