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

function clickedAddDish() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Login!");
            document.getElementById("AddDish").style.backgroundColor = "rgb(236, 179, 72)";
        } else {
            window.alert("Please login first!");
            window.location = "/public/indexPage/indexPage.html";
        }
      });
}

function clickedMenu() {
    document.getElementById("Menu").style.backgroundColor = "rgb(236, 179, 72)";
}

function clickedOrders() {
    document.getElementById("Orders").style.backgroundColor = "rgb(236, 179, 72)";
}

function clickedUsers() {
    document.getElementById("Users").style.backgroundColor = "rgb(236, 179, 72)";
}

function logOut() {
    window.location = "/Authentication/LoginPage/LoginPage.html";
}