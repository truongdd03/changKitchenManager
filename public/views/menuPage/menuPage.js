var ref = firebase.database().ref();
var menu = [];

function reformat(date) {
    var tmp = date[5] + date[6] + date[8] + date[9] + date[2] + date[3];
    return tmp;
}

function loadDish(dish, date) {
    var iconWrapper = document.createElement('div');
    iconWrapper.className = "DeleteIcon";
    iconWrapper.innerHTML = '<i class="far fa-trash-alt"></i>';
    iconWrapper.onclick = (function(dish) {
        return function() {
            deleteDish(dish, date);
        }
    })(dish, date);

    var wrapper = document.createElement('div');
    wrapper.className = "Dish";
    wrapper.innerHTML = '<p class="DishName">' + dish.name + " $" + dish.price + '</p>';
    wrapper.appendChild(iconWrapper);

    document.getElementById(dish.courseType).appendChild(wrapper);
}

function loadMenu(date) {
    menu.forEach(function(id) {
        ref.child("menuDishes").child(id).get().then((dish) => {
            var dict = dish.val();
            var dish = new MenuDish(dict['courseType'], dict['name'], dict['price'], id);
            loadDish(dish, date);
        }).catch((error) => {
            console.log(error);
        })
    });
    $(".loader-wrapper").fadeOut("slow");
}

function fetchMenu(date) {
    $(".loader-wrapper").show();

    $('.Dish').remove();


    menu = [];
    ref.child("menus").child(date).get().then((snapshot) => {
        snapshot.forEach(function(dishID) {
            menu.push(dishID.val());
        });

        loadMenu(date);
    }).catch((error) => {
        console.log(error);
    });
}

function updateDate() {
    var newDate = document.getElementById("newDate").value;
    document.getElementById("currentDate").innerHTML = "Menu";

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

    if (todayDate == newDate) {
        document.getElementById("currentDate").innerHTML = "Today's Menu"
    }

    fetchMenu(reformat(newDate));
}

function deleteDish(dish, date) {
    if (!confirm("Are you sure you want to remove " + dish.name + "?")) {
        return;
    }

    var dishes = document.getElementsByClassName("Dish");
    for (i in dishes) {
        if (dishes[i].textContent == dish.name + " $" + dish.price) {
            dishes[i].remove();
        }
    }

    ref.child('menus').child(date).child("id" + dish.id).remove();
}