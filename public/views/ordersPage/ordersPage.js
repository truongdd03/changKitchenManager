var ref = firebase.database().ref();

var currentID = -1;
var listOfOrders = [];

function fetchOrders(callback) {
    console.log("YES");

    ref.child('orderStatus').on('value', function(snapshot) {
        snapshot.forEach(function(order) {
            var detail = order.val();
            var id = detail['id'];
            var pickUpTime = detail['pickUpTime'];
            var status = detail['status'];
            var cost = detail['total'];
            var uid = detail['uid'];
            var orderDishes = [];

            order.forEach(function(dish) {
                var data = dish.val();
                console.log(data);
                orderDishes.push(new OrderDish(data['id'], data['note'], data['quantity']));
            })

            listOfOrders.push(new Order(id, pickUpTime, status, cost, uid, orderDishes));
        })

        callback();
    })
}

function loadOrders() {
    for (order of listOfOrders) {
        var div = document.createElement('div');
        div.className = "OrderWrapper";
        div.id = order.id;

        div.innerHTML = div.innerHTML + '<p class="OrderInformation">#' + order.id+ '<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderInformation">Truong Dinh Dong<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderPrice">$' + order.cost + '<\p>';
        div.innerHTML = div.innerHTML + '<p class="OrderStatus">' + order.status + '<\p>';

        div.onclick = (function(id) { 
            return function() { 
                clicked(id);
            }
        })(order.id);

        document.getElementById("OrdersWrapper").append(div);
    }

    $(".loader-wrapper").fadeOut("slow");
}

function load() {
    fetchOrders(loadOrders);
}

function clicked(id) {
    var div = document.createElement('div');
    div.innerHTML = '<p> Clicked <\p>';

    document.getElementById(id).style.backgroundColor = "rgb(245, 228, 200)";
    if (currentID != -1) {
        document.getElementById(currentID).style.backgroundColor = "rgb(245, 244, 219)";
    }

    currentID = id;
    document.getElementById("DetailWrapper").append(div);
}