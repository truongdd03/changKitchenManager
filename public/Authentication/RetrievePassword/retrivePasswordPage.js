var firebaseConfig = {
    apiKey: "AIzaSyBRbiFdYbI13Ar2lOru5-HqMFSkf3rHDKM",
    authDomain: "eshop-358c5.firebaseapp.com",
    databaseURL: "https://eshop-358c5-default-rtdb.firebaseio.com",
    projectId: "eshop-358c5",
    storageBucket: "eshop-358c5.appspot.com",
    messagingSenderId: "844303338405",
    appId: "1:844303338405:web:0eb9dbf5cc44913bd8b64c",
    measurementId: "G-M47CJ32FGP"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function resetPassword() {
    var email = $("#email").val();
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        window.alert("Please check your email to reset password!");
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
    });
}