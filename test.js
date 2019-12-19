var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "player.png";

var speed = 2;
var pos = [200,200];
var keyPos=[false,false,false,false];

document.getElementById("body").onkeydown=(e)=>{
	switch(e.key){
		case "ArrowUp":
			keyPos[0]=true;
			break;
		case "ArrowRight":
			keyPos[1]=true;
			break;
		case "ArrowDown":
			keyPos[2]=true;
			break;
		case "ArrowLeft":
			keyPos[3]=true;
			break;
	}
}

document.getElementById("body").onkeyup=(e)=>{
	switch(e.key){
		case "ArrowUp":
			keyPos[0]=false;
			break;
		case "ArrowRight":
			keyPos[1]=false;
			break;
		case "ArrowDown":
			keyPos[2]=false;
			break;
		case "ArrowLeft":
			keyPos[3]=false;
			break;
	}
}


setInterval("Update()",10);

function drawPlayer () {
	ctx.drawImage(img,pos[0],pos[1],40,40);
}

function movePlayer () {
	if(keyPos[0] && pos[1]>=0){
		pos[1] -= speed;
	}
	if(keyPos[1] && pos[0]<=760){
		pos[0] += speed;
	}
	if(keyPos[2] && pos[1]<=760){
		pos[1] += speed;
	}
	if(keyPos[3] && pos[0]>=0){
		pos[0] -= speed;
	}
}

function drawTile (x,y) {
	ctx.fillRect(20, 20, 150, 100);
}

function Update (){
ctx.clearRect(0, 0, canvas.width, canvas.height);
movePlayer();
drawPlayer();
}