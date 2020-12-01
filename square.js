

function Square(x,y,sizeX,sizeY, fruitB=false, sID=false){
	this.position = createVector(x, y);
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.fruitB = fruitB;
	this.id = sID;
	this.update = function(){

	}

	this.show = function(){
		push();
		fill(255, 50)
		if(fruitB){
			fill(255, 0, 0, 100)
		}
		rect(this.position.x, this.position.y, this.sizeX, this.sizeY);
		pop();
	}


	this.hits = function(playerPos, sID=-1){
		if(sID > -1){
			if(sID == this.id){
				if(playerPos.x > this.position.x && playerPos.x < this.position.x + this.sizeX){
					if(playerPos.y > this.position.y && playerPos.y < this.position.y + this.sizeY){
						return true;
					}
				}
			}
			return false;
		}
		else{
			if(playerPos.x > this.position.x && playerPos.x < this.position.x + this.sizeX){
				if(playerPos.y > this.position.y && playerPos.y < this.position.y + this.sizeY){
					return true;
				}
			}
			return false;
		}
	}

}