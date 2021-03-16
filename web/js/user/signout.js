/**
 * Provide handler for signout button.
 */
async function signout() {
    // console.log(document.getElementById("button-userinfo"))
    let response = await fetch("/auth",  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        alert("Sign out successfully. Close this dialog to continue.");
        document.getElementById("button-userinfo").remove();
        document.getElementById("button-signout").remove();
        $("#button-signin").css({
            "visibility": "visible",
        });
        $("#button-register").css({
            "visibility": "visible",
        });
        sessionStorage.removeItem("username"); // Clear user name
        // sessionStorage.removeItem("0"); // Clear guest order
        // location.reload();

        // Remove previous order
        if(document.getElementsByName("previous-order").length !== 0)  location.href = "../";
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}