/**
 * This scripts handles signin functionality.
 */
function signin() {
    // Check if any input is empty.
    let signinUsername = $("#signin-username").val();
    let signinPassword = $("#signin-password").val()
    if ((checkEmpty(signinUsername))
        || checkEmpty(signinPassword)) {

        alert("Error: Empty input(s)! Please re-enter username and/or password.");
        return;
    }
    // Only use simple rules to demo.
    // Require upper case, length >= 8.
    if (signinPassword === signinPassword.toLowerCase() || signinPassword.length < 8) {
        alert("Error: Invalid input(s)! Please re-enter username and/or password.");
        return;
    }

    $("#button-signin").css({
        "visibility": "hidden",
    });
    $("#button-register").css({
        "visibility": "hidden",
    });

    // User info button is not used at the moment (not in specification).
    $("<button type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + signinUsername + "!</button>").insertAfter($("#button-register"));
    $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));
    if (signinUsername === "guest@test.com") {
        hardCodedOrder();
    }
    sessionStorage.setItem("username", signinUsername);
    location.reload();
    // console.log(sessionStorage);
}

/**
 * This provides a hard coded order for a user account.
 */
function hardCodedOrder() {
    let params = new URLSearchParams(window.location.search);

    let toppingPriceList = {
        "topping-cheddar": 0, "topping-mozzarella": 0,
        "topping-english": 0, "topping-feta": 0,
        "topping-spinach": 0, "topping-carrot": 0,
        "topping-sprout": 0, "topping-pickle": 0
    };
    let specialToppingPriceList = {
        "special-topping-hanabero": 0, "special-topping-bbq": 0, "special-topping-garlic": 0, "special-topping-mayonnaise": 0
    };
    toppingPriceList["topping-cheddar"] = 1.99;
    specialToppingPriceList["special-topping-hanabero"] = 0.49;
    let order = new OrderObject(0.99, 3.99, toppingPriceList, 1.99, specialToppingPriceList,
        0.49, 0.49, 1, "$" + 7.95 * 1, "guest", "Wheat Bread", "Beef", "Small");
    order.initToppingType();
    order.initSpecialToppingType();
    let orderInfoInJson = JSON.stringify(order);

    if (params.get("order")) { //Overwrite old order
        let stateComponent = params.get("order").split("-");
        // console.log(stateComponent[1])
        sessionStorage.setItem(stateComponent[1], orderInfoInJson);

        // console.log(sessionStorage)
    } else {
        let savePage = {}
        savePage["bread-wheat"] = true;
        savePage["meat-beef"] = true;
        savePage["topping-cheddar"] = true;
        savePage["special-topping-hanabero"] = true;
        savePage["size-small"] = true;
        savePage["quantity-customization"] = 1;
        savePage["name-customization"] = "guest";
        sessionStorage.setItem("state-1-guest", JSON.stringify(savePage));
        sessionStorage.setItem("0", orderInfoInJson);
    }

}