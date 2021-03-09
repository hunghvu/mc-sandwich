/**
 * Handle register button
 */
async function register() {
    // Check if any input is empty.
    let registerFirstname = $("#register-firstname").val();
    let registerLastname = $("#register-lastname").val();
    let registerUsername = $("#register-username").val();
    let registerEmail = $("#register-email").val();
    let registerPassword = $("#register-password").val();
    let registerRetypePassword = $("#register-retype-password").val();

    if ((checkEmpty(registerFirstname)
        || checkEmpty(registerLastname)
        || checkEmpty(registerUsername)
        || checkEmpty(registerEmail)
        || checkEmpty(registerPassword)
        || checkEmpty(registerRetypePassword))) {

        alert("Error: Empty input(s)! Please re-enter the field(s).");
        return;
    }
    // Only use simple rules to demo.

    // Only require an email to contains '@'.
    if (!registerEmail.includes("@")) {
        alert("Invalid email format");
        return;
    }
    // Require at least one upper case character, length >= 8.
    if (registerPassword === registerPassword.toLowerCase() || registerPassword.length < 8) {
        alert("Error: Invalid password(s)! Passwords require at least 1 upper case character and length greater than 7.");
        return;
    }

    if (registerPassword !== registerRetypePassword) {
        alert("Error: Invalid password(s)! Passwords mismatch.");
        return;
    }

    let response = await fetch("../auth", {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            first: registerFirstname,
            last: registerLastname,
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
            retypePassword: registerRetypePassword
        })
    });

    if (response.ok) {
        let json = await response.json();
        if (json.success) {
            alert("Register successfully. Close this dialog to continue.");
        }
    } else {
        let json = await response.json();
        alert("HTTP-Error: " + response.status + "-" + json.message);
    }



}