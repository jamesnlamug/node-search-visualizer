const runButton = document.querySelector("#bfs-button");
runButton.addEventListener("click", runBFSAlgorithm);

function runBFSAlgorithm() {

	// init
	let startNode = getRandomNode();
	let endNode = null;
	while (endNode == null || endNode === startNode) endNode = getRandomNode();

	startNode.element.classList.add("start-node");
	endNode.element.classList.add("end-node");

	// main loop
	let iterations = 0; // failsafe for infinite loop

	let searchedNodes = [];
	let queue = [startNode];
	let reachedEnd = false;

	while (!reachedEnd && iterations < 10000) {
		
		let currentNode = queue.shift();

		// get adjacent node in all directions
		for (let direction of Direction.cardinalDirections) {
			
			let nextNode = getNodeInDirection(currentNode, direction);
			if (nextNode != null && !searchedNodes.includes(nextNode)) {
				queue.push(nextNode);
				searchedNodes.push(nextNode);
			}
		}

		iterations ++;

		// end condition
		if (currentNode === endNode) {
			reachedEnd = true;
		}
	}

	console.log(`[runBFSAlgorithm] BFS completed with ${iterations} iterations`)
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