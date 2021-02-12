/**
 * This script handles register functionality.
 */
function register() {
    // Check if any input is empty.
    let registerFirstname = $("#register-firstname").val();
    let registerLastname = $("#register-lastname").val();
    let registerUsername = $("#register-username").val();
    let registerPassword = $("#register-password").val();
    let registerRetypePassword = $("#register-retype-password").val();

    if ((checkEmpty(registerFirstname)
        || checkEmpty(registerLastname)
        || checkEmpty(registerUsername)
        || checkEmpty(registerPassword)
        || checkEmpty(registerRetypePassword))) {

        alert("Error: Empty input(s)! Please re-enter the field(s).");
        return;
    }
    // Only use simple rules to demo.
    // Require upper case, length >= 8.
    if (registerPassword === registerPassword.toLowerCase() || registerPassword.length < 8) {
        alert("Error: Invalid password(s)! Passwords require at least 1 upper case character and length greater than 7.");
        return;
    }

    if (registerPassword !== registerRetypePassword) {
        alert("Error: Invalid password(s)! Passwords mismatch.");
        return;
    }

    $("#button-signin").css({
        "visibility": "hidden",
    });
    $("#button-register").css({
        "visibility": "hidden",
    });
    // User info button is not used at the moment (not in specification).
    $("<button type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + registerUsername + "!</button>").insertAfter($("#button-register"));
    $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));

}