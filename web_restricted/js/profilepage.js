/**
 * This script provide functionality for the profile page
 */
window.onload = () => {
    displayUsername();
    getPreviousOrders();
}

/**
 * This function get a logged user's previous orders.
 */
async function getPreviousOrders() {
    let response = await fetch("../orders", {
        method: "GET"
    })

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        if (json.orders) {
            let orderHistoryContent = $("#order-history-content");
            orderHistoryContent.empty();
            json.orders.forEach(element => {
                let orderString =
                    "<p id='orderid-" + element.orderid + "' name='previous-order'><img src='../image/order-remove.svg' alt='Remove order button' onclick='deletePreviousOrders("
                    + element.orderid + ")'> <b>Order name:</b> "
                    + element["order_name"]
                    + ", <b>bread: </b>"
                    + element.bread
                    + ", <b>meat: </b>"
                    + element.meat
                    + ", <b>quantity: </b>"
                    + element.quantity
                    + ", <b>size: </b>"
                    + element.size;
                orderString += ", <b>topping: </b>";
                if (element["topping_crumbled_feta"]) orderString += "Crumbled Feta, ";
                if (element["topping_mozzarella_cheese"]) orderString += "Mozzarella cheese, ";
                if (element["topping_natural_cheddar_cheese"]) orderString += "Natural Cheddar cheese, ";
                if (element["topping_not_choose"]) orderString += "None, ";
                if (element["topping_old_english_cheese"]) orderString += "Old English cheese, ";
                if (element["topping_pickle"]) orderString += "Pickle, ";
                if (element["topping_shredded_carrot"]) orderString += "Shredded Carrot, ";
                if (element["topping_spinach"]) orderString += "Spinach, ";
                if (element["topping_sprout"]) orderString += "Sprout, ";
                orderString += "<b>special topping: </b>"
                if (element["special_topping_garlic_aioli"]) orderString += "Garlic Aioli, ";
                if (element["special_topping_habanero_hot_sauce"]) orderString += "Hanebaro Hot Sauce, "
                if (element["special_topping_mayonnaise"]) orderString += "Mayonnaise, "
                if (element["special_topping_not_choose"]) orderString += "None, "
                if (element["special_topping_smokey_bbq"]) orderString += "Smokey BBQ, "
                orderString += "<b>Total: </b>$" + element["total_usd"] + "</p><br>";
                orderHistoryContent.append(orderString);

            });
        }
        if (json.message) console.log(json.message);
        // alert(json.orders);

    } else {
        // console.log(response.status)
        let json = await response.json() // Short json, parsing is fast so can but alert after this
        alert("HTTP-Error: " + response.status + "-" + json.message);
    }
}

/**
 * This function delete a logged user's previous order.
 */
async function deletePreviousOrders(orderid) {
    // console.log(orderid)
    let response = await fetch("../orders", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            orderId: orderid
        })
    })

    if (response.ok) { // if HTTP-status is 200-299
        let json = await response.json();
        alert(json.message);
        $("#orderid-" + orderid).next().remove();
        $("#orderid-" + orderid).remove();
    } else {
        // console.log(response.status)
        let json = await response.json() // Short json, parsing is fast so can but alert after this
        alert("HTTP-Error: " + response.status + "-" + json.message);
    }
}
