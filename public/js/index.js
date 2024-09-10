var firebaseConfig = {
    apiKey: "AIzaSyBcSgpGnRVH7p1uGk9zgyNKlJ9hfxrnsE0",
    authDomain: "konnect-officiallygod.firebaseapp.com",
    projectId: "konnect-officiallygod",
    storageBucket: "konnect-officiallygod.appspot.com",
    messagingSenderId: "870888679225",
    appId: "1:870888679225:web:38cbde1a5cc950447d2ae8",
    measurementId: "G-93VP3M5RN7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Persistance
firebase.auth.Auth.Persistence.LOCAL;

firebase.analytics();

// Login Functionality with Firebase Email and Password
$("#btn-login").click(function(){

    var email = $("#email").val();
    var password = $("#password").val();

    if(email != "" && password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error) {
            
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("Error: " + errorCode)
            console.log("Error: " + errorMessage)
            window.alert("Error: " + errorCode + " Msg: " + errorMessage);
        });

    }else{
        window.alert("Please Enter the Details correctly...");
    }
});

// Register Functionality with Firebase Email and Password
$("#btn-signup").click(function(){

    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if(email != "" && password != "" && confirmPassword != "")
    {
        if(password == confirmPassword) {

            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            result.catch(function(error) {
            
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("Error: " + errorCode)
                console.log("Error: " + errorMessage)
                window.alert("Error: " + errorCode + " Msg: " + errorMessage);
            });

        }else{

            window.alert("Passwords don't match!");
        }

    }else{
        window.alert("Please Enter the Details correctly...");
    }
});

// Forgot Password Functionality with Firebase
$("#btn-resetPassword").click(function(){

    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "" ){

        auth.sendPasswordResetEmail(email).then(function() {

            window.alert("Email has been sent to you, Please check and verify.");

        }).catch(function(error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            console.log("Error: " + errorCode)
            console.log("Error: " + errorMessage)
            window.alert("Error: " + errorCode + " Msg: " + errorMessage);
        });

    }else{
        window.alert("Please Enter the Email correctly...");
    }
});

// Logout Functionality using Firebase
$("#btn-logout").click(function(){

    firebase.auth().signOut();
});