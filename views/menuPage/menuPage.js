function updateDate() {
    var newDate = document.getElementById("newDate").value;
    document.getElementById("currentDate").innerHTML = newDate;

    // Get today date
    var date = new Date();
    var todayDate = date.getFullYear() + "-";
    var month = date.getMonth() + 1;
    if (month < 10) {
        todayDate = todayDate + "0" + month + "-";
    } else {
        todayDate = todayDate + month + "-";
    }
    var day = date.getDate();
    if (date < 10) {
        todayDate = todayDate + "0" + day;
    } else {
        todayDate = todayDate + day;
    }

    if (todayDate == newDate || newDate == "") {
        document.getElementById("currentDate").innerHTML = "Today's Menu"
    }
}

function clicked() {
    
}