var oncetick = false;
var canvas;
function main()
{
	canvas = document.getElementById("screen");
	gl = canvas.getContext("experimental-webgl");
	
	initShaders(gl);
	
	for (var i = 0; i < 9; i++)
	{
		initTextures(i,"images/element" + i + ".png");
	}
	initTextures(9,"images/panel.png");
}

var textures = [];

function initTextures(id, filename)
{
	textures[id] = gl.createTexture();
	textures[id].image = new Image();
	textures[id].image.onload = function(){handleLoadedTexture(id);};
	textures[id].image.src = filename;
}

function handleLoadedTexture(id)
{
	gl.bindTexture(gl.TEXTURE_2D, textures[id]);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[id].image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindTexture(gl.TEXTURE_2D,null);
	
	if (id == 9)
	{
	
		initElementsPositions();
	
		canvas.onmousedown = function(ev)
		{
			is_spinning = true; 
			initElementsPositions();
			if (!oncetick)
			{
				oncetick = true;
				tick();
			}
		};
	
		var tick = function()
		{
			initVertex();
			if (is_spinning)
				requestAnimationFrame(tick);
		};
	
		tick();
	}
}
