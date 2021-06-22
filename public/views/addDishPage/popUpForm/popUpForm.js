function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function validate(name, price) {
	if (name == "" || price == "") {
		window.alert("Please fill all fields.")
		return false;
	}

	if (isNaN(price)) {
		window.alert("Invalid Price")
		return false;
	}

	return true;
}

function submitDish() {
	var name = $("#DishName").val();
	var price = $("#DishPrice").val();
	validate(name, price);
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
	document.getElementById("DishName").value = "";
	document.getElementById("DishPrice").value = "";
}