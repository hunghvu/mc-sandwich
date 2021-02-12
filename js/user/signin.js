function signin(){
    // Check if any input is empty.
    let username = $("#username").val();
    let password = $("#password").val()
    if(( username === "" || username === null || username === undefined)
        || (password === "" || password === null || password === undefined)) {

        alert("Error: empty input! Please re-enter username and/or password.");
        return;
    }
    // Only use simple rules to demo.
    // Require upper case, length >= 8.
    if(password === password.toLowerCase() || password.length < 8) {
        alert("Error: invalid input! Please re-enter username and/or password.");
        return;
    }
}