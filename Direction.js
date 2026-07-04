class Direction {
	static cardinalDirections = [];

	constructor (row, col) {
		this.row = row;
		this.col = col;
	}
}

Direction.cardinalDirections.push(new Direction(-1, 0));
Direction.cardinalDirections.push(new Direction(1, 0));
Direction.cardinalDirections.push(new Direction(0, -1));
Direction.cardinalDirections.push(new Direction(0, 1));