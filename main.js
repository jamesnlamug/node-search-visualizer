//
//
//
const gridContainer = document.querySelector(".grid");
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

document.querySelector("#reset-visuals-button").addEventListener("click", resetNodeVisuals);

function resetNodeVisuals() {

	resetVisualizationTimers();
	for (let r=0; r<gridRows; r++) {
		for (let c=0; c<gridColumns; c++) {

			grid[r][c].resetElementClasses();
		}
	}
}

function getRandomNode() {
	let row = Math.floor(Math.random() * gridRows);
	let column = Math.floor(Math.random() * gridColumns);
	return grid[row][column];
}

function getNodeInDirection(node, direction) {
	let row = node.row+direction.row;
	let col = node.col+direction.col;

	if (row >= 0 && row < gridRows && col >= 0 && col < gridColumns) {
		return grid[row][col];
	}
	
	// position outside of grid
	return null;
}

const searchIterationDelayMilliseconds = 10;
const pathIterationDelayMilliseconds = 20;
let visualizationTimers = [];

function applySearchVisual(searchedNodeGroups) {

	resetVisualizationTimers();
	for (let group of searchedNodeGroups) {
		for (let node of group.nodes) {

			visualizationTimers.push( setTimeout(() => {
				node.element.classList.add("searched-node");
			}, searchIterationDelayMilliseconds*group.iteration));
		}
	}

	return searchedNodeGroups[searchedNodeGroups.length-1].iteration*searchIterationDelayMilliseconds;
}

function applyPathVisual(searchDelay, startNode, endNode, paths) {

	let pathedNode = traceNodePathBackwards(endNode, paths);

	let pathNodes = [];
	while (pathedNode != startNode) {
		pathNodes.unshift(pathedNode);
		pathedNode = traceNodePathBackwards(pathedNode, paths);
	}

	for (let i=0; i<pathNodes.length; i++) {
		let node = pathNodes[i];
		visualizationTimers.push( setTimeout(() => {
				node.element.classList.add("path-node");
		}, searchDelay + pathIterationDelayMilliseconds*i));
	}
}

function resetVisualizationTimers() {
	for (let timer of visualizationTimers) {
		clearTimeout(timer);
	}
}