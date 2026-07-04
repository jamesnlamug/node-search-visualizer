class DFSData {
	constructor (endNode) {
		this.searchedNodes = [];
		this.searchedNodeGroups = [];
		this.pathways = [];

		this.endNode = endNode;
		this.reachedEnd = false;

		this.preferredDirection = Direction.cardinalDirections[0];
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
	let data = runDFSStep(startNode, new DFSData(endNode));

	console.log(`[runDFSAlgorithm] DFS completed with ${data.iterations} iterations`);

	// run visuals
	let searchDelay = applySearchVisual(data.searchedNodeGroups);
	applyPathVisual(searchDelay, startNode, endNode, data.pathways);
}

function runDFSStep(currentNode, data) {
	data.iterations ++;
	data.searchedNodes.push(currentNode);
	data.searchedNodeGroups.push(new NodeIterationGroup(data.iterations));

	if (currentNode === data.endNode) {
		data.reachedEnd = true;
		return data;
	}

	if (data.iterations > 1000) {
		console.log(`[runDFSStep] Reached max iteration count`);
		return data;
	}
	
	// get adjacent node in all directions
	let directions = [data.preferredDirection, ...Direction.cardinalDirections];
	for (let direction of directions) {
		
		let nextNode = getNodeInDirection(currentNode, direction);
		if (nextNode != null && !data.searchedNodes.includes(nextNode)) {
			
			data.searchedNodeGroups[data.searchedNodeGroups.length-1].nodes.push(nextNode);
			data.pathways.push(new NodePath(nextNode, currentNode));

			data.preferredDirection = direction;
			data = runDFSStep(nextNode, data);

			if (data.reachedEnd) {
				return data;
			}
		}
	}

	// reached max depth
	return data;
}