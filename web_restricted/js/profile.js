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
        if(json.orders) console.log(json.orders);
        if(json.message) console.log(json.message);
        // alert(json.orders);
        reset();

    } else {
        // console.log(response.status)
        let json = await response.json() // Short json, parsing is fast so can but alert after this
        alert("HTTP-Error: " + response.status + "-" + json.message);
    }
}
