/**
 * This provides a hard coded order for a user account.
 */
function hardCodedOrder() {
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
            0.49, 0.49, quickOrderQuantity.val(), "$" + 7.95 * quickOrderQuantity.val(), quickOrderName.val(), "Wheat Bread", "Beef", "Small");
        order.initToppingType();
        order.initSpecialToppingType();
        let orderInfoInJson = JSON.stringify(order);

        if (params.get("order")) { //Overwrite old order
            let stateComponent = params.get("order").split("-");
            console.log(stateComponent[1])
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



        // }
    
}