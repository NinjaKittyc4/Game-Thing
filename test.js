var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "player.png";

var map=[];

var speed = 2;
var pos = [50,50];
var screenPos = [400,400];
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

for (var i = 0; i<101; i++) {
	map.push([]);
	for (var j = 0; j<101; j++) {
		map[i].push({x:i,y:j,id:"grass"});
	}
}

setInterval(Update,10);

function drawPlayer () {
	ctx.drawImage(img,screenPos[0],screenPos[1],40,40);
	//drawDude(ctx,screenPos[0]+20,screenPos[1]+20,"#000000");
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
		if(screenPos[0]+vector[0]*speed<=800 && screenPos[0]+vector[0]*speed>=0) {
			screenPos[0]+=vector[0]*speed;
		}
		if(screenPos[1]+vector[1]*speed>=0 && screenPos[1]+vector[1]*speed<=800) {
			screenPos[1]+=vector[1]*speed;
		}
	}
}

function drawTile (x,y,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 40, 40);
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(x, y, 40, 40);
}

function drawMap(){
	for(var row of map) {
		for(var tile of row) {
			drawTile((tile.x+pos[0])*40,(tile.y+pos[0])*40,"#4D9939")
		}
	}
}

function drawCircle(CTX,xPos,yPos,radius,color) {
	CTX.beginPath()
	CTX.lineWidth=0;
	CTX.fillStyle=color;
	CTX.arc(xPos, yPos, radius, 0, 2*Math.PI, true);
	CTX.fill();
}
function drawDude(CTX,x,y,color) {
	var pathX=[20,2,2,20,20,2,-2,-20,-20,-2,-2,-20,-14,0,14,20];
	var pathY=[20,0,-11,-3,-7,-15,-15,-7,-3,-11,0,20,20,4,20,20];
	CTX.fillStyle=color;
	CTX.beginPath();
	CTX.moveTo(x+pathX[0],y+pathY[0]);
	for(var i=1; i<pathX.length; i++) {
		CTX.lineTo(x+pathX[i],y+pathY[i]);
	}
	CTX.closePath();
	CTX.fill();
	drawCircle(CTX,x,y-19.5,6.5,color);
}

function Update (){
ctx.clearRect(0, 0, canvas.width, canvas.height);
movePlayer();
drawMap();
drawPlayer();
}