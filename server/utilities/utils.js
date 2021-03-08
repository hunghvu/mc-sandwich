// Lab 5 step 20
//Checks if a string exists and is not empty. Used for parameters. 
function isProvided(param) {
    return param !== undefined && param.length > 0
}

module.exports = { isProvided }