//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided

/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    // const theQuery = 
    //     `SELECT My_Size, My_Color, Option1, Option2, Option3 
    //      FROM Orders`

    const theQuery = 
        `SELECT My_Size, My_Color, Option1, Option2, Option3 
         FROM Orders
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]

    // const theQuery = 
    //     `SELECT * 
    //      FROM Orders`

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                response.send({
                    orders: result.rows
                })
            } else {
                response.status(404).send({
                    message: "No Orders"
                })
            }
        })
        .catch(err => {
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})

/**
 * @api {post} orders Place orders by putting orders information into DB
 * @apiName PostOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Body-Example:
 *      {
 *          "size": "large",
 *          "color": "green",
 *          "option1": "true",
 *          "option2": "false",
 *          "option3": "true"
 *      }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Order is inserted"
 *     }
 * 
 * @apiError (400: Missing authorization header) {String} message "Missing authorization header"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (400: Missing parameters) {String} message "Missing parameters"
 * @apiError (400: Invalid parameters) {String} message "Invalid parameters"
 * @apiError (400: Fail to insert order) {String} message "Fail to insert order"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response) => {
    const valueProvided = request.body.order[0] !== undefined;
    if (!valueProvided)  {
        response.status(400).send({message: "Missing parameters"});
        return;
    };

    let orderCounter = 0;
    while(request.body.order[orderCounter] !== undefined) {
        // console.log(request.body.order[orderCounter].total)
        // console.log(request.body.order[orderCounter]);
        const isBreadTypeValid = ["Wheat Bread", "White Bread", "Maled Rye", "Italian Herb & Cheese"].includes(request.body.order[orderCounter].breadType[0]);
        const isMeatTypeValid = ["Chicken", "Pork", "Beef", "None"].includes(request.body.order[orderCounter].meatType[0]);
        const isSizeValid = ["Small", "Medium", "Large"].includes(request.body.order[orderCounter].sizeType[0]);
        let isToppingValid = [].some.call(request.body.order[orderCounter].toppingType, element => 
            ["Natural Cheddar Cheese", "Mozzarella Cheese", "Old English Cheese", "Crumbled Feta", 
            "Spinach", "Shredded Carrot", "Sprout", "Pickle", "None"].includes(element)
        )
        let isSpecialToppingValid = [].some.call(request.body.order[orderCounter].specialToppingType, element => 
            ["Habanero Hot Sauce", "Smokey BBQ", "Garlic Aioli", "Mayonnaise", "None"].includes(element)
        )
        // console.log("Bread", isBreadTypeValid);
        // console.log("Meat", isMeatTypeValid);
        // console.log("Size", isSizeValid);
        // console.log("Topping", isToppingValid);
        // console.log("Special topping", isSpecialToppingValid);
        // console.log("--------------------------------------------------");
        const isJsonValid = isBreadTypeValid && isMeatTypeValid && isSizeValid && isToppingValid && isSpecialToppingValid;
        if (!isJsonValid) {
            response.status(400).send({message: "Invalid parameters"});
            return;
        };
        const memberId = request.decoded.memberid;
        // Insert to table
        const theQuery = "INSERT INTO Orders(MemberID, Bread, Meat, Topping_Natural_Cheddar_Cheese, "
            + "Topping_Mozzarella_Cheese, Topping_Old_English_Cheese, Topping_Crumbled_Feta, Topping_Spinach, "
            + "Topping_Shredded_Carrot, Topping_Sprout, Topping_Pickle, Topping_Not_Choose, Special_Topping_Habanero_Hot_Sauce, "
            + "Special_Topping_Smokey_BBQ, Special_Topping_Garlic_Aioli, Special_Topping_Mayonnaise, Special_Topping_Not_Choose, Size, Quantity, Total_USD, Order_Name) "
                        +"VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) "
        let values = [];
        values.push(memberId);
        values.push(request.body.order[orderCounter].breadType[0]);
        values.push(request.body.order[orderCounter].meatType[0]);

        // Topping
        values.push(request.body.order[orderCounter].toppingType.includes("Natural Cheddar Cheese"));
        values.push(request.body.order[orderCounter].toppingType.includes("Mozzarella Cheese"));
        values.push(request.body.order[orderCounter].toppingType.includes("Old English Cheese"));
        values.push(request.body.order[orderCounter].toppingType.includes("Crumbled Feta"));
        values.push(request.body.order[orderCounter].toppingType.includes("Spinach"));
        values.push(request.body.order[orderCounter].toppingType.includes("Shredded Carrot"));
        values.push(request.body.order[orderCounter].toppingType.includes("Sprout"));
        values.push(request.body.order[orderCounter].toppingType.includes("Pickle"));
        values.push(request.body.order[orderCounter].toppingType.includes("None"));
        // Special topping
        values.push(request.body.order[orderCounter].specialToppingType.includes("Habanero Hot Sauce"));
        values.push(request.body.order[orderCounter].specialToppingType.includes("Smokey BBQ"));
        values.push(request.body.order[orderCounter].specialToppingType.includes("Garlic Aioli"));
        values.push(request.body.order[orderCounter].specialToppingType.includes("Mayonnaise"));
        values.push(request.body.order[orderCounter].specialToppingType.includes("None"));

        values.push(request.body.order[orderCounter].sizeType[0]);
        values.push(parseInt(request.body.order[orderCounter].quantity));
        values.push(request.body.order[orderCounter].total.substring(1));
        values.push(request.body.order[orderCounter].name);
        console.log("Values to insert into DB", values);
        // Error prone, need to fix "cannot set headers again".
        pool.query(theQuery, values).then(result => {
            response.status(200).send({
                success: true,
                message: "Order is inserted"
            })
        }).catch((err) => {
            // console.log(err);
            response.status(400).send({
                success: false,
                message: "Fail to insert order"
            })
        })
        orderCounter++;
    }
})
module.exports = router