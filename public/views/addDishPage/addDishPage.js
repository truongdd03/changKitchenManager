function load() {
    for (i = 0; i < 10; ++i) {

        //var tmp = new MenuDishes("main", "egg", 2, 20);
        //console.log(tmp.getName());

        var div = document.createElement('div');
        div.className = "DishWrapper";
        div.innerHTML = div.innerHTML + '<img src="https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ae3qqfev6j7hzhxw6if3" class="Image">';
        div.innerHTML = div.innerHTML + '<p class="Name">Chocolate Ice-cream</p>';
        div.innerHTML = div.innerHTML + '<p class="Price">$100</p>';

        document.getElementById("Dishes").append(div);
    }
}