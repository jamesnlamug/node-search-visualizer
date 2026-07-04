class GridNode {
	constructor (row, col) {
		this.row = row;
		this.col = col;

		this.element = document.createElement("div");
		this.element.classList.add("grid-node");
	}
}