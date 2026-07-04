//
//
//
const gridContainer = document.querySelector(".grid-container");
const gridRows = 10;
const gridColumns = 20;

for (let i=0; i<gridRows; i++) {

	let gridRowElement = document.createElement("div");
	gridRowElement.classList.add("grid-row");
	gridContainer.appendChild(gridRowElement);

	for (let j=0; j<gridColumns; j++) {

		let gridNodeElement = document.createElement("div");
		gridNodeElement.classList.add("grid-node");
		gridRowElement.appendChild(gridNodeElement);
	}
}