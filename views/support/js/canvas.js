var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Mouse Movement

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 10;
var minRadius = 2;

var colorArray = [
	'#3399ff',
	'#99ccff',
	'#004080',
	'#6666ff',
];

window.addEventListener('mousemove', function(event) { 
	mouse.x = event.x;
	mouse.y = event.y;
});

//________________Fixbug when size is refreshed_________________
window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// Bubble Animation

function Circle(x, y, dx, dy, radius) {
	this.x = x, this.y = y;
	this.dx = dx, this.dy = dy;
	this.radius = radius;
	this.minRadius = minRadius;
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = colorArray[ Math.floor ( Math.random() * colorArray.length ) ];
		c.fill();
	}

	this.update = function() {	//___________________Condition to Bounce Around__________________ 
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy;
		this.x += this.dx;
		this.y += this.dy;

		//Interactivity

		if (mouse.x - this.x < 25 && mouse.x - this.x > -25 && mouse.y - this.y < 25 && mouse.y - this.y > -25) {
			if (this.radius < maxRadius) {
				this.radius +=0.1;
			} 
		} else if (this.radius > this.minRadius) {
			this.radius -=0.1;
		}
		this.draw();
	}
}

var circleArray = [];

function init() {
	for (var i = 1; i<=750; ++i) {			   
		var x = Math.random() * innerWidth, y = Math.random() * innerHeight ;
		var dx = (Math.random()-0.5) , dy = (Math.random()-0.5) ;
		var radius = Math.random() * 30 + 1;
		circleArray.push(new Circle(x, y, dx, dy, radius/10));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for(var i = 1; i<= circleArray.length; ++i) {
		circleArray[i].update();
	}
}

init();
animate();