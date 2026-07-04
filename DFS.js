class DFSData {
	constructor (searchedNodes, endNode) {
		this.searchedNodes = searchedNodes;
		this.endNode = endNode;
		this.reachedEnd = false;

		this.iterations = 0;
	}
}

const dfsButton = document.querySelector("#dfs-button");
dfsButton.addEventListener("click", runDFSAlgorithm);

function runDFSAlgorithm() {

	// reset
	resetNodeVisuals();

	// init
	let startNode = getRandomNode();
	let endNode = null;
	while (endNode == null || endNode === startNode) endNode = getRandomNode();

	startNode.element.classList.add("start-node");
	endNode.element.classList.add("end-node");

	// main loop
	let data = runDFSStep(startNode, new DFSData([], endNode));

	console.log(`[runDFSAlgorithm] DFS completed with ${data.iterations} iterations`);

	// run visuals
	//let searchDelay = applySearchVisual(searchedNodeGroups);
	//applyPathVisual(searchDelay, startNode, endNode, pathways);
}

function runDFSStep(currentNode, data) {
	data.searchedNodes.push(currentNode);
	data.iterations ++;

	if (currentNode === data.endNode) {
		data.reachedEnd = true;
		return data;
	}

	if (data.iterations > 1000) {
		console.log(`[runDFSStep] Reached max iteration count`);
		return data;
	}
	
	// get adjacent node in all directions
	for (let direction of Direction.cardinalDirections) {
		
		let nextNode = getNodeInDirection(currentNode, direction);
		if (nextNode != null && !data.searchedNodes.includes(nextNode)) {
			
			data = runDFSStep(nextNode, data);
			if (data.reachedEnd) {
				return data;
			}
		}
	}

	// reached max depth
	return data;
}