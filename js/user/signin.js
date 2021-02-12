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
}