function load() {
    for (i = 0; i < 4; i++) {
        var div = document.createElement('div');
        div.className = "OrderWrapper";
        div.innerHTML = div.innerHTML + '<p class="OrderInformation">#123212<\p>'
        div.innerHTML = div.innerHTML + '<p class="OrderInformation">Truong Dinh Dong<\p>'
        div.innerHTML = div.innerHTML + '<p class="OrderPrice">$123<\p>'
        document.getElementById('Main').append(div)
    }
}