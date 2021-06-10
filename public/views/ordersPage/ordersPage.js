var currentID = -1;

function load() {
    for (i = 0; i < 10; i++) {

        var div = document.createElement('div');
        div.className = "OrderWrapper";
        div.id = String(i);

        div.innerHTML = div.innerHTML + '<p class="OrderInformation">#123212<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderInformation">Truong Dinh Dong<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderPrice">$123<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderStatus">Completed<\p>';

        div.onclick = (function(i) { 
            return function() { 
                clicked(i);
            }
        })(i);

        document.getElementById("OrdersWrapper").append(div);
    }
}

function clicked(id) {
    var div = document.createElement('div');
    div.innerHTML = '<p> Clicked <\p>';

    document.getElementById(id).style.backgroundColor = "rgb(245, 228, 200)";
    if (currentID != -1) {
        document.getElementById(currentID).style.backgroundColor = "white";
    }

    currentID = id;
    document.getElementById("DishesWrapper").append(div);
}