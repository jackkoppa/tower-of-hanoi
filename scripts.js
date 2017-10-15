var towers = [];
var loadTime = 2000;
var moveTime = 500;
var moveInt = [];
var timeCounter;

function clearMain() {	
	var main = document.getElementById("main");
	while(main.firstChild) main.removeChild(main.firstChild);
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

function move(tower, endPos) {
	return new Promise(resolve => {
		moveInt.push(setTimeout(() => {
			towers[tower].setAttribute("data-position",endPos);
			resolve();
		}, moveTime));
		timeCounter++;
	})
} 

function hanoi(startPos, endPos, midPos, height) {
	return new Promise(resolve => {
		if (height === 1) move(0, endPos).then(() => resolve());
		else {
			hanoi(startPos, midPos, endPos, height - 1)
				.then(() => move(height - 1, endPos))
				.then(() => hanoi(midPos, endPos, startPos, height - 1))
				.then(() => resolve());			
		}
	});
} 

function run(e) {	
	var towersNum = document.getElementById("towers").value;
	if(towersNum > 20) return false;
	hide('prompt');
	initialize(towersNum)
		.then(() => hanoi('1','3','2',towersNum))
		.then(() => stop());
	return false;
}

function hide(id) {
	document.getElementById(id).style.display = 'none';
}

function show(id) {
	document.getElementById(id).style.display = 'inline';
}

function stop() {
	hide('stop');
	moveInt.forEach((item) => clearTimeout(item));
	show('reset');
}

function reset() {
	hide('reset');
	clearMain();
	towers = [];
	moveInt = [];
	timeCounter = 0;
	show('prompt');
	show('stop');
}
