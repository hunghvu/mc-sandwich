$(document).ready(() => {
    let username = sessionStorage.getItem("username")
    if (username) {
        $("#button-signin").css({
            "visibility": "hidden",
        });
        $("#button-register").css({
            "visibility": "hidden",
        });
        $("<button type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + username + "!</button>").insertAfter($("#button-register"));
        $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));
    }
})