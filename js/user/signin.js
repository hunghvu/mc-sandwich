/**
 * This scripts handles signin functionality.
 */
function signin(){
    // Check if any input is empty.
    let signinUsername = $("#signin-username").val();
    let signinPassword = $("#signin-password").val()
    if((checkEmpty(signinUsername))
        || checkEmpty(signinPassword)) {

        alert("Error: Empty input(s)! Please re-enter username and/or password.");
        return;
    }
    // Only use simple rules to demo.
    // Require upper case, length >= 8.
    if(signinPassword === signinPassword.toLowerCase() || signinPassword.length < 8) {
        alert("Error: Invalid input(s)! Please re-enter username and/or password.");
        return;
    }
}