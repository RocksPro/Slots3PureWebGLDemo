var elem = [];
var barsTransformWait = [];

var barsSpeed = [0,0,0,0,0];
var barsdeltaSpeed = [0,0,0,0,0];
var barsStage = [0,0,0,0,0];
var elementsTexturesId = [];

const launchSpeed = 0.003;
const launchAcceleration = -0.0001;
const mainAcceleration = -0.0003;
const stopSpeed = -0.07;
const finishSpeed = -0.003;
const finishAcceleration = 0.0001;
const finishStopSpeed = 0.0059;
const barsWaitDeltaTick = 10;

const bottomTeleportLevel = -0.79;
const topTeleportTarget = 0.77;

const elementsDeltaPos = 0.4;
const barsCount = 5;
const elementsPerBar = 4;

var is_spinning = false;

function initElementsPositions()
{
	barsSpeed = [0,0,0,0,0];
	barsdeltaSpeed = [0,0,0,0,0];
	barsStage = [0,0,0,0,0];
	for (var i = 0; i < barsCount; i++)
	{
		barsTransformWait[i] = i * barsWaitDeltaTick;
		elem[i] = [];
		for (var j = 0; j < elementsPerBar; j++)
		{
			elem[i][j] = [];
			
			elem[i][j][0] = (i-2)*(-elementsDeltaPos);
			elem[i][j][1] = (j-1)*(elementsDeltaPos);
		}
	}
	SetRandomTexture();
}

function Spinning()
{
	for (var i = 4; i >= 0; i--)
	{
		barsTransformWait[4-i]--;
		for (var j = 0; j < 4; j++)
		{
			var elemvertex = Translate(vertices, elem[4-i][j]);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, elemvertex, gl.STATIC_DRAW);
			gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
			gl.enableVertexAttribArray(a_Position);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);
			gl.vertexAttribPointer(aTextureCoord,2,gl.FLOAT,false,0,0);
			gl.enableVertexAttribArray(aTextureCoord);
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, textures[elementsTexturesId[i*barsCount + elementsPerBar]]);
			gl.uniform1i(gl.getUniformLocation(program, "uSampler"),0);
	
			gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
			
			if (barsTransformWait[4-i] <= 0 || !is_spinning)
			{
				BarSpinning(i,j);
			}
		}
	}
	is_texturesSet = true;
}

function SetRandomTexture()
{

	for (var i = 0; i < barsCount; i++)
	{
		for (var j = 0; j < elementsPerBar; j++)
		{
			elementsTexturesId[i*barsCount + elementsPerBar] = Math.floor(Math.random() * (8));
		}
	}

}

function BarSpinning(BarId, eleminbar)
{
	switch (barsStage[BarId])
	{
		case 0:
		{
			barsSpeed[BarId] = launchSpeed;
			barsdeltaSpeed[BarId] = launchAcceleration;
			barsStage[BarId]++;
			break;
		}
		case 1:
		{
			if (barsSpeed[BarId] <= 0)
			{
				barsdeltaSpeed[BarId] = mainAcceleration;
				barsStage[BarId]++;
			}
			break
		}
		case 2:
		{
			if (barsSpeed[BarId] <= stopSpeed)
			{
				barsSpeed[BarId] = finishSpeed;
				barsdeltaSpeed[BarId] = finishAcceleration;
				barsStage[BarId]++;
			}
			break
		}
		case 3:
		{
			if (barsSpeed[BarId] > finishStopSpeed)
			{
				barsSpeed[BarId] = 0;
				barsdeltaSpeed[BarId] = 0;
			}
			break
		}
	}
	
	elem[BarId][eleminbar][1] += barsSpeed[BarId];
	if (elem[BarId][eleminbar][1] < bottomTeleportLevel)
		elem[BarId][eleminbar][1] = topTeleportTarget;
	
	barsSpeed[BarId] += barsdeltaSpeed[BarId];
}