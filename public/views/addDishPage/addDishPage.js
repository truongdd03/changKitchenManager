var listOfDishes = [];
var storage = firebase.storage().ref();

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

    listOfDishes.forEach(function(dish) {
        var path = dish.id + '.jpg';
        storage.child('/Dish Image/'+path).getDownloadURL().then(function(url) {
            var div = document.createElement('div');
            div.className = "DishWrapper";
            div.innerHTML = div.innerHTML + '<img src=' + url + ' class="Image">';
            div.innerHTML = div.innerHTML + '<p class="Name">' + dish.name + '</p>';
            div.innerHTML = div.innerHTML + '<p class="Price">$' + dish.price + '</p>';

            document.getElementById("Dishes").append(div);
        });
    });

    $(".loader-wrapper").fadeOut("slow");
}

function load() {
    fetchAllDishes(loadAllDishes);
}

function filter() {
    // Declare variables
    var input, filter,li, a, i, txtValue;
    input = document.getElementById('SearchBar');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('DishWrapper');
    
    for (i = 0; i < li.length; i++) {
      a = li[i].childNodes[1];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}