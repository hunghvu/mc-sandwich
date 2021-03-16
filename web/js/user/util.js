/**
 * Display logged username on top right.
 */
function displayUsername() {
         let username = sessionStorage.getItem("username")
         if (username) {
             $("#button-signin").css({
                 "visibility": "hidden",
             });
             $("#button-register").css({
                 "visibility": "hidden",
             });
             $("<div class='dropdown' style='margin-top: 4px'>"
                 + "<button class='dropdown-toggle' data-toggle='dropdown' type='button' class='btn bg-transparent' id='button-userinfo'>Welcome " + username + "!</button>"
                 + "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"
                 + "<a class='dropdown-item' href='../profile'>Profile</a>"
                 + "</div>"
             ).insertAfter($("#button-register"));
             $("<button type='button' class='btn bg-transparent' id='button-signout' onclick='signout()'>Sign out</button>").insertBefore($("#dialog-signin"));
         }
}