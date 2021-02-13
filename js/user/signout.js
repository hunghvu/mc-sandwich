function signout() {
    // console.log(document.getElementById("button-userinfo"))
    document.getElementById("button-userinfo").remove();
    document.getElementById("button-signout").remove();
    $("#button-signin").css({
        "visibility": "visible",
    });
    $("#button-register").css({
        "visibility": "visible",
    });
    sessionStorage.removeItem("username"); // Clear user name
    sessionStorage.removeItem("0"); // Clear guest order
    location.reload();
}