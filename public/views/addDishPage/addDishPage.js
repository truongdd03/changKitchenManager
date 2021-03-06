var listOfDishes = [];
var storage = firebase.storage().ref();
var ref = firebase.database().ref();

function isDishExist(dish) {
    for (item of listOfDishes) {
        if (item.id == dish.id) {
            return true
        }
    }
    return false;
}

function fetchAllDishes(callback) {
    ref.child('menuDishes').on('value', function(snapshot) {
        var hasChanged = false;

        snapshot.forEach(function(dish) {
            var info = dish.val();
            var tmp = new MenuDish(info['courseType'], info['name'], info['price'], info['id']);
            if (isDishExist(tmp) == false) {
                listOfDishes.push(tmp);
                hasChanged = true
            }
        })

        if (hasChanged) { callback(); }
    })
}

function loadDish(dish, url) {
    var div = document.createElement('div');
    div.className = "DishWrapper";

    var icon = document.createElement('i');
    icon.className = "fas fa-times";
    div.onclick = (function(dish) {
        return function() {
            deleteDish(dish);
        }
    })(dish);
    div.appendChild(icon);

    div.innerHTML += '<img src=' + url + ' class="Image">';
    div.innerHTML += '<p class="Name">' + dish.name + '</p>';
    div.innerHTML += '<p class="Price">$' + dish.price + '</p>';

    document.getElementById("Dishes").append(div);
}

function loadAllDishes() {
    var i = 0;
    listOfDishes.forEach(function(dish) {
        var path = dish.id + '.jpg';
        storage.child('/Dish Image/' + path).getDownloadURL().then(function(url) {
            loadDish(dish, url);
            ++i;
            if (i == listOfDishes.length) {
                $(".loader-wrapper").fadeOut("slow");
            }
        });
    });
}

function load() {
    fetchAllDishes(loadAllDishes);
}

function filter() {
    // Declare variables
    var input, filter, li, a, i, txtValue;
    input = document.getElementById('SearchBar');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('DishWrapper');

    for (i = 0; i < li.length; i++) {
        a = li[i].childNodes[2];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function removeDishFromList(dish) {
    for (i in listOfDishes) {
        if (dish.id == listOfDishes[i].id) {
            listOfDishes.splice(i, 1);
            return;
        }
    }
}

function deleteConfirm(dish) {
    if (confirm("Are you sure you want to remove " + dish.name + "?")) {
        return true;
    }
    return false;
}

function deleteDish(dish) {
    if (deleteConfirm(dish) == false) { return; }
    removeDishFromList(dish);
    var dishes = document.getElementsByClassName('DishWrapper');

    for (i in dishes) {
        if (dish.name == dishes[i].childNodes[2].textContent) {
            dishes[i].remove();
            break;
        }
    }

    ref.child('menuDishes').child(dish.id).remove();
}