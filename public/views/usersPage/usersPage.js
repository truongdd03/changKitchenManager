var ref = firebase.database().ref();

var listOfUsers = []; 

function fetchData(callback) {
    ref.child('users').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            var name = data['firstname'] + " " + data['lastname'];
            var phone = data['phone'];
            var order = data['order'];
            listOfUsers.push(new User(name, phone, order));
        })
        callback();
    }).catch((error) => {
        console.log(error.message);
    });
}

function loadUsers() {
    for (user of listOfUsers) {
        var div = document.createElement('div');
        div.innerHTML += '<p class="Name">' + user.name + '</p>';
        div.innerHTML += '<p class="Phone">' + user.phone + '</p>';
        div.innerHTML += '<i class="fa fa-trash"></i>'
        div.innerHTML += '<p class="Rank">'+ user.rank + '</p>';
        div.className = "UserWrapper";

        document.getElementById('UsersWrapper').append(div);
    }
}

function load() {
    fetchData(loadUsers);
}