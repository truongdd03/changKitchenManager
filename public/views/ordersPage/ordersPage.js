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

    var tbody = document.getElementById('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    var pos = findPositionOfOrder(id);
    for (dish of listOfOrders[pos].dishes) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.className = "column3";
        td1.appendChild(document.createTextNode(dish.id));
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.className = "column4";
        td2.appendChild(document.createTextNode(100));
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.className = "column5";
        td3.appendChild(document.createTextNode(dish.quantity));
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.className = "column6";
        td4.appendChild(document.createTextNode(100));
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}