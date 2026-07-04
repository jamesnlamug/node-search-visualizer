//
//
//
const gridContainer = document.querySelector(".grid-container");
const grid = [];

const gridRows = 10;
const gridColumns = 20;

for (let r=0; r<gridRows; r++) {

	let gridRow = [];
	
	let gridRowElement = document.createElement("div");
	gridRowElement.classList.add("grid-row");
	gridContainer.appendChild(gridRowElement);

	for (let c=0; c<gridColumns; c++) {

		let node = new GridNode(r, c);
		gridRowElement.appendChild(node.element);

		gridRow.push(node);
	}

	grid.push(gridRow);
}