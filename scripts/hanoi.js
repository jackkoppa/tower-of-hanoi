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