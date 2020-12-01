const TOTAL_POP = 40;
var players = [];
var savedPlayers = [];
var score = 0;
var generation = 0;
var total_fitness = 0;
var slider;
var levelManager;
var timerMax = 2000;
var timer = timerMax;
var checkBox;
var showStuff = true;
var fitnessValuesTotal = [];
var ctx;
var myLineChart;

function setup (){
	angleMode(DEGREES);
	createCanvas(1000, 1000).position(600,0);
	slider = createSlider(1, 500, 1);
	for(var i = 0; i < TOTAL_POP; i++){
		players[i] = new Player(300, 720, i);
	}

	levelManager = new LevelSetup();
	levelManager.createSquares();
	levelManager.createFruits();
	checkbox = createCheckbox('Show stuff', false);
  	checkbox.changed(myCheckedEvent);

  	ctx = document.getElementById('chart').getContext('2d');
  	myLineChart = new Chart(ctx, {
    type: 'line',
     data: {
        labels: [],
        datasets: [{
            label: ["Fitness"],
            data: [],
            lineTension: 0,
        	}]},
    	options: {
                responsive: false
            }
	});
}

function myCheckedEvent() {
  if (this.checked()) {
    showStuff = false;
  } else {
    showStuff = true;
  }
}

function draw(){


	for(var c = 0; c < slider.value(); c ++){
	for(var j = players.length -1; j >= 0; j--){
		if(players[j].collision()){
			savedPlayers.push(players.splice(j, 1)[0]);
			}
	}
	

	for(var i = players.length -1; i >= 0; i--){
		players[i].see();
		players[i].think();
		players[i].move();
		//players[i].collision();

	}
	if(timer == 0){
		for(var j = players.length -1; j >= 0; j--){
			savedPlayers.push(players.splice(j, 1)[0]);
		}
	}

	if(players.length == 0){
		score = 0;
		fitnessValuesTotal.push(nextGeneration());
		myLineChart.data.datasets.forEach((dataset) => {
        dataset.data.push(fitnessValuesTotal[fitnessValuesTotal.length-1]);
    	});
    	//myLineChart.data.push(fitnessValuesTotal[fitnessValuesTotal.length-1]);
		myLineChart.data.labels.push(fitnessValuesTotal.length-1);
		myLineChart.update();
		levelManager.createFruits();
		timer = timerMax;
		break;
	}
	timer --;
	}

	//Drawing
	background(51);

	if(showStuff == true){
	levelManager.showSquares();
	levelManager.showFruits();
	for(var i = players.length -1; i >= 0; i--){
		players[i].show();
	}
	}

	fill(255, 250)
	textSize(25);
	text("Total population: " + TOTAL_POP, 100, 20);
	text("Generation: " + generation, 100, 60);	
	text("Fitness: " + total_fitness, 100, 100);
	text("Timer: " + timer, 100, 140)
	text("Speed: " + int(slider.value()), 100, 180);	
}
