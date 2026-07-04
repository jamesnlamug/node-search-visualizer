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
	let iterations = 0; // failsafe for infinite loop

	let searchedNodes = [];
	let searchedNodeGroups = [];
	let pathways = [];
	let queue = [startNode];
	let reachedEnd = false;

	while (!reachedEnd && iterations < 10000) {

		// end condition
		if (currentNode === endNode) {
			reachedEnd = true;
		}
	}

	console.log(`[runDFSAlgorithm] DFS completed with ${iterations} iterations`);

	// run visuals
	//let searchDelay = applySearchVisual(searchedNodeGroups);
	//applyPathVisual(searchDelay, startNode, endNode, pathways);
}