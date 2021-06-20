var listOfDishes = [];

function fetchAllDishes(callback) {
    var ref = firebase.database().ref();
    ref.child('menuDishes').on('value', function(snapshot) {
        snapshot.forEach(function(dish) {
            var info = dish.val();
            var tmp =  new MenuDish(info['courseType'], info['name'], info['price'], info['id']);
            listOfDishes.push(tmp);
        })

        callback();
    })
}

function loadAllDishes() {
    for (dish of listOfDishes) {

        var div = document.createElement('div');
        div.className = "DishWrapper";
        div.innerHTML = div.innerHTML + '<img src="https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ae3qqfev6j7hzhxw6if3" class="Image">';
        div.innerHTML = div.innerHTML + '<p class="Name">' + dish.name + '</p>';
        div.innerHTML = div.innerHTML + '<p class="Price">$' + dish.price + '</p>';

        document.getElementById("Dishes").append(div);
    }

    $(".loader-wrapper").fadeOut("slow");
}

function load() {
    fetchAllDishes(loadAllDishes);
}