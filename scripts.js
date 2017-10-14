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
	
}

function setOpacity() {
	towers.forEach((tower, i) => {
		setTimeout(() => tower.style.opacity = 1, (towers.length - i) * (loadTime / towers.length));
	});
}

function move(tower, endPos) {
	moveInt.push(setTimeout(() => {
		towers[tower].setAttribute("data-position",endPos);
	}, moveTime * timeCounter));
	timeCounter++;	
} 

function hanoi(startPos, endPos, midPos, height) {
	if (height === 1) move(0, endPos);
	else {
		hanoi(startPos, midPos, endPos, height - 1);
		move(height - 1, endPos);
		hanoi(midPos, endPos, startPos, height - 1);
	} 
} 

function run(e) {	
	var towersNum = document.getElementById("towers").value;
	if(towersNum > 20) return false;
	initialize(towersNum);
	hide('prompt');
	setOpacity();
	hanoi('1','3','2',towersNum);
	return false;
}

function hide(id) {
	let el = document.getElementById(id)
	el.style.display = 'none';
	el.style.opacity = 0;
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
