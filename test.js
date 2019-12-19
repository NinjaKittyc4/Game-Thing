var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "player.png";

var speed = 2;
var pos = [200,200];
var keyPos={ArrowUp:false,ArrowRight:false,ArrowDown:false,ArrowLeft:false};
var directions=["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];
var vectors={ArrowUp:[0,-1],ArrowRight:[1,0],ArrowDown:[0,1],ArrowLeft:[-1,0]};

document.getElementById("body").onkeydown=(e)=>{
	if(keyPos[e.key]!==undefined)
		keyPos[e.key]=true;
}

document.getElementById("body").onkeyup=(e)=>{
	if(keyPos[e.key]!==undefined)
		keyPos[e.key]=false;
}


setInterval("Update()",10);

function drawPlayer () {
	ctx.drawImage(img,pos[0],pos[1],40,40);
}

function movePlayer () {
	var vector=[0,0];
	for(var i=0; i<directions.length; i++) {
		if(keyPos[directions[i]]) {
			vector[0]+=vectors[directions[i]][0];
			vector[1]+=vectors[directions[i]][1];
		}
	}
	var magn=Math.sqrt(vector[0]*vector[0]+vector[1]*vector[1]);
	if(magn>0) {
		vector[0]/=magn;
		vector[1]/=magn;
		if(pos[1]+vector[1]>=0 && pos[0]+vector[0]<=760 && pos[1]+vector[1]<=760 && pos[0]+vector[0]>=0) {
			pos[0]+=vector[0]*speed;
			pos[1]+=vector[1]*speed;
		}
	}
}

function drawTile (x,y) {
	ctx.fillRect(x, y, x+40, y+40);
}

function drawDude(CTX,x,y) {
	
}

function Update (){
ctx.clearRect(0, 0, canvas.width, canvas.height);
movePlayer();
drawPlayer();
}