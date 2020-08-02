function Board(el) {
	this.el = document.querySelector(el);
	this.n = 4;
	this.correctRowNumber = 0;
	this.correctColNumber = 0;
	this.score = 0;
	this.createBoard();
	this.handleEvents();
	this.updateScore();
}

Board.prototype.generateColor = function () {
	var ratio = 0.618033988749895;

	var hue = (Math.random() + ratio) % 1;
	var saturation = Math.round(Math.random() * 100) % 85;
	var lightness = Math.round(Math.random() * 100) % 85;

	var color = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + lightness + '%)';
	var oddColor = 'hsl(' + Math.round(360 * hue) + ',' + saturation + '%,' + (lightness + 5) + '%)';

	return {
		color,
		oddColor,
	};
};

Board.prototype.pickRandomRowAndColumn = function () {
	return {
		r: Math.floor(Math.random() * this.n),
		c: Math.floor(Math.random() * this.n),
	};
};

Board.prototype.createBoard = function () {
	const { color, oddColor } = this.generateColor();
	const { r, c } = this.pickRandomRowAndColumn();
	this.correctRowNumber = r;
	this.correctColNumber = c;
	this.clearPrevBoard(this.el);
	let fragment = new DocumentFragment();
	for (var i = 0; i < this.n; i++) {
		for (var j = 0; j < this.n; j++) {
			let box = document.createElement('div');
			box.setAttribute(
				'style',
				`width: ${300 / this.n}px; 
				height: ${300 / this.n}px; 
				background: ${i == r && j == c ? color : oddColor}; 
			`
			);
			box.dataset['row'] = i;
			box.dataset['col'] = j;
			box.setAttribute('class', 'box');
			fragment.append(box);
			this.el.append(fragment);
		}
	}
};

Board.prototype.handleEvents = function () {
	this.el.addEventListener(
		'click',
		(e) => {
			this.checkSelectedBox(e);
		},
		false
	);
};

Board.prototype.checkSelectedBox = function ({ target }) {
	const selectedRow = target.dataset['row'];
	const selectedCol = target.dataset['col'];

	if (selectedRow == this.correctRowNumber && selectedCol == this.correctColNumber) {
		this.n = this.n + 1;
		this.score = this.score + 1;
		this.createBoard();
		this.updateScore();
		this.el.classList.remove('shake');
	} else {
		this.resetGame();
	}
};

Board.prototype.clearPrevBoard = function (e) {
	var child = e.lastElementChild;
	while (child) {
		e.removeChild(child);
		child = e.lastElementChild;
	}
};

Board.prototype.resetGame = function () {
	this.n = 4;
	this.score = 0;
	this.createBoard();
	this.updateScore();
	this.el.classList.add('shake');
};

Board.prototype.updateScore = function () {
	const elem = document.getElementById('score');
	elem.innerHTML = 'Score: ' + this.score;
};

new Board('#board');
