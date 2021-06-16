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
    document.getElementById("AddDish").style.backgroundColor = "rgb(236, 179, 72)";
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
    firebase.auth().signOut().then(() => {
        window.location.href = "/indexPage/indexPage.html";
    }).catch((error) => {
        console.log(error);
    });
}