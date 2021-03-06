var ref = firebase.database().ref();

var currentID = -1;
var listOfOrders = [];

function isExisted(order) {
    for (item of listOfOrders) {
        if (item.id == order.id) {
            return true;
        }
    }
    return false;
}

function checkOrder(order, quantity) {
    var list = order.dishes;
    if (list.length != quantity) return false;
    for (dish of list) {
        if (dish.id == undefined || dish.quantity == undefined) {
            return false;
        }
    }
    return true;
}

function fetchOrders(callback) {
    ref.child('orderStatus').on('value', function(snapshot) {
        var hasChanged = false;
        snapshot.forEach(function(order) {
            var detail = order.val();
            var orderDishes = [];

            order.forEach(function(dish) {
                var data = dish.val();
                if (data['id'] != undefined) {
                    orderDishes.push(new OrderDish(data['id'], data['note'], data['quantity']));
                }
            })
        
            var newOrder = new Order(detail['id'], detail['pickUpTime'], detail['status'], detail['total'], detail['uid'], orderDishes);
            if (!isExisted(newOrder) && checkOrder(newOrder, detail['quantity'])) {
                if (!hasChanged) {
                    window.alert("New order!");
                    hasChanged = true;
                }
                listOfOrders.push(newOrder);
            }
        })

        callback();
    })
}

function resetOrdersWrapper() {
    var wrapper = document.getElementById('OrdersWrapper');
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
}

function findDate(pickUpTime) {
    var tmp = pickUpTime[4] + pickUpTime[5];
    for (i = 0; i < 4; ++i) {
        tmp += pickUpTime[i];
    }
    return tmp;
}

function loadOrders() {
    resetOrdersWrapper();

    listOfOrders.forEach(function(order) {
        var div = document.createElement('div');
        div.className = "OrderWrapper";
        div.id = order.id;
    
        ref.child('users').child(order.uid).on('value', function(snapshot) {
            var dict = snapshot.val();
            var name = dict['firstname'] + " " + dict['lastname'];

            div.innerHTML = div.innerHTML + '<p class="OrderInformation">#' + order.id + '<\p>';
            div.innerHTML = div.innerHTML + '<p class="OrderInformation">' + name + '<\p>';
            div.innerHTML = div.innerHTML + '<p class="OrderPrice">$' + order.cost + '<\p>';
            div.innerHTML = div.innerHTML + '<p class="OrderStatus">' + order.status + '<\p>';
    
            div.onclick = (function(id) { 
                return function() { 
                    clicked(id);
                }
            })(order.id);
    
            document.getElementById("OrdersWrapper").append(div);
        });

    })

    if (currentID != -1) { document.getElementById(currentID).style.backgroundColor = "rgb(245, 228, 200)"; }
    $(".loader-wrapper").fadeOut("slow");
}

function load() {
    fetchOrders(loadOrders);
}

function changeColorOfRow(id) {
    document.getElementById(id).style.backgroundColor = "rgb(245, 228, 200)";
    if (currentID != -1 && currentID != id) {
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

function loadTable(order, dish) {
    var tr = document.createElement('tr');

    tr.onclick = function() {
        if (order.note != "") {
            window.alert(order.note);
        }
    }

    var td1 = document.createElement('td');
    td1.className = "column3";
    if (order.note != "") {
        td1.appendChild(document.createTextNode(dish.name + "**"));
    } else {
        td1.appendChild(document.createTextNode(dish.name));
    }
    tr.appendChild(td1);
                
    var td2 = document.createElement('td');
    td2.className = "column4";
    td2.appendChild(document.createTextNode('$' + dish.price));
    tr.appendChild(td2);
                
    var td3 = document.createElement('td');
    td3.className = "column5";
    td3.appendChild(document.createTextNode(order.quantity));
    tr.appendChild(td3);
                
    var td4 = document.createElement('td');
    td4.className = "column6";
    td4.appendChild(document.createTextNode('$' + (dish.price * order.quantity).toFixed(2)));
    tr.appendChild(td4);

    tbody.appendChild(tr);
}

function fetchMenuDish(order) {
    var ref = firebase.database().ref();
    ref.child('menuDishes').on('value', function(snapshot) {
        snapshot.forEach(function(dish) {
            var info = dish.val();
            if (info['id'] == order.id) {
                var tmp =  new MenuDish(info['courseType'], info['name'], info['price'], info['id'], "");
                loadTable(order, tmp);
            }
        })
    })
}

var tbody;
function clicked(id) {
    changeColorOfRow(id);

    tbody = document.getElementById('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    var pos = findPositionOfOrder(id);
    for (order of listOfOrders[pos].dishes) {
        fetchMenuDish(order);
        document.getElementById('TotalLabel').textContent = "Total: $" + listOfOrders[pos].cost.toFixed(2);
        document.getElementById('TimeLabel').textContent = "Pick-up Time: " + listOfOrders[pos].reformatTime;
    }
}


//Status

const status = ["Received", "Cooking", "Almost Done", "Finished", "Paid"];

function findCurrentStatusID(cur) {    
    for (i = 0; i < status.length; i++) {
        if (status[i] == cur) {
            return i;
        }
    }
}

function upClicked() {
    var pos = findPositionOfOrder(currentID);
    var order = listOfOrders[pos];
    var id = findCurrentStatusID(order.status);

    if (id < 4) {
        ref.child('orderStatus').child(order.id).child('status').set(status[id+1]);
        listOfOrders[pos].status = status[id+1];
        reloadOrder(pos);
    }
}

function reloadOrder(pos) {
    var newStatus = listOfOrders[pos].status;
    var wrapper = document.getElementById(currentID);
    wrapper.childNodes[6].textContent = newStatus;
    document.getElementById(currentID).style.backgroundColor = "rgb(245, 228, 200)";
}

function downClicked() {
    var pos = findPositionOfOrder(currentID);
    var order = listOfOrders[pos];
    var id = findCurrentStatusID(order.status);

    if (id > 0) {
        ref.child('orderStatus').child(order.id).child('status').set(status[id-1]);
        listOfOrders[pos].status = status[id-1];
        reloadOrder(pos);
    }
}