var lastGeneration;

function nextGeneration(){

	var fitnessTemp = calculateFitness();

	for(var i = 0; i < TOTAL_POP; i++){
		players[i] = pickOne(i);
	}
	savedPlayers = [];
	generation ++;
	return fitnessTemp;
}


function pickOne(i){
	var index = 0;
	var r = random(1);
	while (r > 0){ 
		r = r - savedPlayers[index].fitness; 
		index ++;
	}

	index --;

	var player = savedPlayers[index];

	var child = new Player(300, 720, i, player.brain);
	child.mutate(0.1);
	return child;
}

function calculateFitness(){
	var sum = 0;
	for(var i = savedPlayers.length -1; i >= 0; i--){
		sum += savedPlayers[i].score;
	}

	for(var i = savedPlayers.length -1; i >= 0; i--){
		savedPlayers[i].fitness = savedPlayers[i].score / sum;
	}
	total_fitness = int(sum / 100);
	return total_fitness;
}