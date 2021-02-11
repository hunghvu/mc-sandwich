/**
 * This script will display all order upon a page loaded.
 */
$(document).ready(() => {
    let orderCounter = 0;
    while (sessionStorage.getItem(orderCounter.toString())) {

        let orderInJson = JSON.parse(sessionStorage.getItem(orderCounter.toString()));
        // console.log(order);
        orderCounter++;
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
                    + "</div>"
                + "</div>"
            + "</th>"
            + "<td>"
                + orderInJson.total
            + "</td>"
            + "</tr>")
    }
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
