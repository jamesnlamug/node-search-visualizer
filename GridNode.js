class GridNode {
	constructor (row, col) {
		this.row = row;
		this.col = col;

		this.element = document.createElement("div");
		this.resetElementClasses();
	}

	resetElementClasses() {
		
		this.element.className = "";
		this.element.classList.add("grid-node");
	}
}