var ref = firebase.database().ref();

var currentID = -1;
var listOfOrders = [];

function fetchOrders(callback) {
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
                if (data['id'] != undefined) {
                    orderDishes.push(new OrderDish(data['id'], data['note'], data['quantity']));
                }
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

function changeColorOfRow(id) {
    document.getElementById(id).style.backgroundColor = "rgb(245, 228, 200)";
    if (currentID != -1) {
        document.getElementById(currentID).style.backgroundColor = "rgb(245, 244, 219)";
    }
    currentID = id;
}

function findPositionOfOrder(id) {
    for (i in listOfOrders) {
        if (listOfOrders[i].id == id) {
            return i;
        }
    }
}

function clicked(id) {
    changeColorOfRow(id);

    /*var limiter = document.createElement('div');
    limiter.className = 'limiter';
    
    var container_table100 = document.createElement('div');
    container_table100.className = "container-table100";

    var wrap_table100 = document.createElement('div');
    wrap_table100.className = "wrap_table100";*/


    var table = document.createElement('div');
    table.className = "table100";

    var pos = findPositionOfOrder(id);
    for (dish of listOfOrders[pos].dishes) {
        var tr = document.createElement('tr');

        var th1 = document.createElement('th');
        th1.className = "column3";
        th1.innerHTML = 
        table.innerHTML += '<tr><th class="column3">' + dish.id + '</th>'
        table.innerHTML += '<th class="column4">$' + 100 + '</th>'
        table.innerHTML += '<th class="column5">' + dish.quantity + '</th>'
        table.innerHTML += '<th class="column6">$' + 100 + '</th></tr>'
    }

}