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
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.post("/", (request, response) => {
    // if (!(isProvided(request.headers.authorization) || request.headers.authorization.startsWith('Basic '))) {
    //     response.status(400).send({message: "Missing authorization header"});
    //     return;
    // };
    // console.log(request);
    //Retrieve data from query params
    const size = request.body.size;
    const color = request.body.color;
    const option1 = request.body.option1;
    const option2 = request.body.option2;
    const option3 = request.body.option3;
    console.log(request.body);
    console.log(size);
    console.log(color);
    console.log(option1);
    console.log(option2);
    console.log(option3);
    console.log("-----------");
    console.log(isProvided(size));
    console.log(isProvided(color));
    console.log(isProvided(option1));
    console.log(isProvided(option2));
    console.log(isProvided(option3));
    const valueProvided = isProvided(size) && isProvided(color) && isProvided(option1) && isProvided(option2) && isProvided(option3);
    if (!valueProvided)  {
        response.status(400).send({message: "Missing parameters"});
        return;
    };

    const validBoolean = [
        "TRUE", "t", "true", "y", "yes", "on", "1", // True
        "FALSE", "f", "false", "n", "no", "off", "0", // False
        "null", "unknown" // Unknown
    ]
    const isSizeValid = ["small", "medium", "large"].includes(size);
    const isColorValid = ["red", "green", "blue"].includes(color);
    const isOptionsProvided = validBoolean.includes(option1) && validBoolean.includes(option2) && validBoolean.includes(option3);
    const isJsonValid = isSizeValid && isColorValid && isOptionsProvided;
    if (!isJsonValid) {
        response.status(400).send({message: "Invalid parameters"});
        return;
    };

    const memberId = request.decoded.memberid;

    // Insert to table
    const theQuery = "INSERT INTO Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3) "
                    +"VALUES ($1, $2, $3, $4, $5, $6) "
    const values = [memberId, size, color, option1, option2, option3];
    pool.query(theQuery, values).then(result => {
        // console.log(true);
        response.status(200).send({
            success: true,
            message: "Order is inserted"
        })
    })

})
module.exports = router