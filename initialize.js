var towers = [];
var loadTime = 2000;
var moveTime = 500;
var moveInt = [];
var timeCounter;

function clearMain() {	
	var main = document.getElementById("main");
	while(main.firstChild) main.removeChild(main.firstChild);
}

function setOpacity() {
	let reversedTowers = towers.slice(0).reverse();
	return reversedTowers.reduce((promise, tower) => {
		return promise.then(() => {
			return new Promise(resolve => {
				setTimeout(() => {
					tower.style.opacity = 1;
					resolve();
				}, loadTime / towers.length);
			});
		});
	}, Promise.resolve());
}

function initialize(height) {
	timeCounter = Math.ceil(loadTime / moveTime) + 1;
	var sizeInc = (100 / 3 - 2) / height;
	var bgInc = Math.floor((256 - 50) / height);		

	clearMain();
	for (var i = 0; i < height; i++) {
		towers[i] = document.createElement("div");
		towers[i].id = i + 1;
		towers[i].className = "tower";
		towers[i].style.zIndex = height - i;
		towers[i].style.opacity = 0;
		towers[i].setAttribute("data-position","1");			
		var inner = document.createElement("div");	
		inner.className = "inner";		
		inner.style.backgroundColor = "rgb(0,0," + (256 - ((bgInc * i))) + ")";
		inner.style.height = sizeInc * (i + 1) + "vh";
		inner.style.width = sizeInc * (i + 1) + "vh";
		towers[i].appendChild(inner);
		document.getElementById("main").appendChild(towers[i]);
	} 
	
	return setOpacity();
}