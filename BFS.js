const bfsButton = document.querySelector("#bfs-button");
bfsButton.addEventListener("click", runBFSAlgorithm);

function runBFSAlgorithm() {

	// reset
	resetNodeVisuals();

	// init
	let startNode = getRandomNode();
	let endNode = null;
	while (endNode == null || endNode === startNode) endNode = getRandomNode();

	startNode.element.classList.add("start-node");
	endNode.element.classList.add("end-node");

	// main loop
	let iterations = 0; // failsafe for infinite loop

	let searchedNodes = [];
	let searchedNodeGroups = [];
	let pathways = [];
	let queue = [startNode];
	let reachedEnd = false;

	while (!reachedEnd && iterations < 10000) {
		
		searchedNodeGroups.push(new NodeIterationGroup(iterations));
		let currentNode = queue.shift();

		// get adjacent node in all directions
		for (let direction of Direction.cardinalDirections) {
			
			let nextNode = getNodeInDirection(currentNode, direction);
			if (nextNode != null && !searchedNodes.includes(nextNode)) {
				queue.push(nextNode);
				searchedNodes.push(nextNode);
				searchedNodeGroups[searchedNodeGroups.length-1].nodes.push(nextNode);
				iterations ++;

				pathways.push(new NodePath(nextNode, currentNode));
			}
		}

		// end condition
		if (currentNode === endNode) {
			reachedEnd = true;
		}
	}

	console.log(`[runBFSAlgorithm] BFS completed with ${iterations} iterations`);

	// run visuals
	let searchDelay = applySearchVisual(searchedNodeGroups);
	applyPathVisual(searchDelay, startNode, endNode, pathways);
}

function traceNodePathBackwards(node, paths) {

	for (let nodePath of paths) {

		if (nodePath.node == node) {
			return nodePath.previousNode;
		}
	}

	// did not find
	return null;
}