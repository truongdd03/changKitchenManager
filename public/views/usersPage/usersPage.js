var ref = firebase.database().ref();

var listOfUsers = []; 

function fetchData(callback) {
    ref.child('users').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            var name = data['firstname'] + " " + data['lastname'];
            var phone = data['phone'];
            var order = data['orders'];
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
        div.innerHTML += '<p class="Rank">'+ user.rank + '</p>';
        div.className = "UserWrapper";

        document.getElementById('UsersWrapper').append(div);
    }

    $(".loader-wrapper").fadeOut("slow");
}

function load() {
    fetchData(loadUsers);
}

function filter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('SearchBar');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('UserWrapper');
    
    for (i = 0; i < li.length; i++) {
      a = li[i].firstChild;
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }