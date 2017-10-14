var towers = [];
var timeCounter = 5;
var moveInt = [];

function initialize(height) {
	var main = document.getElementById("main");
	var sizeInc = (100 / 3 - 2) / height;
	var bgInc = Math.floor((256 - 50) / height);
	var opacityInc = 2000 / height;	
	timeCounter = 5;
	function setOpacity(j) {
		opacityInt = setTimeout(function() {
			towers[j].style.opacity = 1;
		}, (height - j) * opacityInc);	
	}

	while(main.firstChild) {
		main.removeChild(main.firstChild);
	}
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
		setOpacity(i);
	} 
}

function move(tower, endPos) {
	moveInt.push(setTimeout(function() {
		towers[tower].setAttribute("data-position",endPos);
	}, 500 * timeCounter));
	timeCounter++;	
} 

function hanoi(startPos, endPos, midPos, height) {
	if (height === 1) {
		move(0, endPos);
		return Promise.resolve();
	} 
	else {
		hanoi(startPos, midPos, endPos, height - 1);
		move(height - 1, endPos);
		hanoi(midPos, endPos, startPos, height - 1);
		return Promise.resolve();
	} 
} 

function runIt() {	
	var towersNum = document.getElementById("towers").value;
	if(towersNum > 20) return false;
	var prompt = document.getElementById("prompt");
	initialize(towersNum);
	hanoi('1','3','2',towersNum).then(() => {
		prompt.style.opacity = "0";
		prompt.style.display = "none";
	});	
}

function stopIt() {
	moveInt.forEach(function(item) {
		clearTimeout(item);
	});
}