function load() {
    for (i = 0; i < 20; ++i) {
        var div = document.createElement('div');
        div.innerHTML += '<p class="Name">Truong Dinh Dong</p>';
        div.innerHTML += '<p class="Phone">0911099706</p>';
        div.innerHTML += '<img class="BinImage" src="../support/images/bin.jpg">'
        div.innerHTML += '<p class="Rank">Loyal User</p>';
        div.className = "UserWrapper";

        document.getElementById('UsersWrapper').append(div);
    }
}