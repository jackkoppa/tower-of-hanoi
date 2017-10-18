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

function run(e) {	
	var towersNum = document.getElementById("towers").value;
	if(towersNum > 20) return false;
	hide('prompt');
	initialize(towersNum)
		.then(() => hanoi('1','3','2',towersNum))
		.then(() => stop());
	return false;
}

