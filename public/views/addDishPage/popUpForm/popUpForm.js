function openForm() {
	document.getElementById("myForm").style.display = "block";
}

function validate(dish, file) {
	if (dish.name == "" || dish.price == "") {
		window.alert("Please fill all fields.");
		return false;
	}

	if (file == undefined || file.name.indexOf(".jpg") == -1) {
		window.alert("Please choose an image (.jpg)");
		return false;
	}

	if (isNaN(dish.price)) {
		window.alert("Invalid Price");
		return false;
	}

	return true;
}

function fetchID(dish, file) {
	ref = firebase.database().ref();
	ref.child("menuDishID").once('value').then((snapshot) => {
		var tmp = snapshot.val();
		ref.child("menuDishID").set(tmp + 1);
		dish.id = tmp;
		listOfDishes.push(dish);

		ref.child("menuDishes").child(dish.id).set({
			courseType: dish.courseType,
			id: dish.id,
			name: dish.name,
			price: dish.price
		})

		storage.child("Dish Image").child(tmp + ".jpg").put(file).then((snapshot) => {

			var path = dish.id + '.jpg';
			storage.child('/Dish Image/' + path).getDownloadURL().then(function(url) {
				loadDish(dish, url);
				$(".loader-wrapper").fadeOut("slow");
				window.alert("Added " + dish.name +"!");
				closeForm();
			});
		});
	});
}

function submitDish() {
	var name = $("#DishName").val();
	var price = parseFloat($("#DishPrice").val(), 10);
	var courseType = document.getElementById('CourseTypes').value;
	var file = document.getElementById('uploadImage').files[0];
	var newDish = new MenuDish(courseType, name, price, "");

	if (!validate(newDish, file)) {
		return;
	}

	$(".loader-wrapper").show();
	fetchID(newDish, file);
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
	document.getElementById("DishName").value = "";
	document.getElementById("DishPrice").value = "";
}