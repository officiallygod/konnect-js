// Get if User is Logged In then change get his User ID

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        // User logged in already or has just logged in.
        var userId = user.uid;
        var userEmail = user.email;

        console.log(userId);
        document.getElementById("UID").innerHTML = userId;
        
    }
});