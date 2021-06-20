var listOfDishes = [];
var storage = firebase.storage().ref();

function fetchAllDishes(callback) {
    var ref = firebase.database().ref();
    ref.child('menuDishes').on('value', function(snapshot) {
        snapshot.forEach(function(dish) {
            var info = dish.val();
            var path = info['id'] + '.jpg';
            storage.child('/Dish Image/'+path).getDownloadURL().then(function(url) {
                var tmp =  new MenuDish(info['courseType'], info['name'], info['price'], info['id'], url);
                listOfDishes.push(tmp);
                loadDish(tmp);
            })
        })
        $(".loader-wrapper").fadeOut("slow");

        //callback();
    })
}

function loadDish(dish) {

        var div = document.createElement('div');
        div.className = "DishWrapper";
        div.innerHTML = div.innerHTML + '<img src=' + dish.url + ' class="Image">';
        div.innerHTML = div.innerHTML + '<p class="Name">' + dish.name + '</p>';
        div.innerHTML = div.innerHTML + '<p class="Price">$' + dish.price + '</p>';

        document.getElementById("Dishes").append(div);

}

function load() {
    fetchAllDishes();
}