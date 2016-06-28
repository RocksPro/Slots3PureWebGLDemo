var vertices = new Float32Array(
		[-0.17,0.17,
		 -0.17,-0.17,
		  0.17,0.17,
		  0.17,-0.17]
	);

var textureCoords = new Float32Array(
		[0.0,1.0,
		 0.0,0.0,
		 1.0,1.0,
		 1.0,0.0]
	);
	
var verticesBuffer;
var textureCoordBuffer;

function initVertex()
{
	verticesBuffer = gl.createBuffer();
	textureCoordBuffer = gl.createBuffer();
	
	if (!verticesBuffer)
	{
		alert("Failed to create the buffer object");
	}
	
	gl.clearColor(1.0,1.0,1.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);	
	
	gl.uniform4f(a_FragColor,1.0,1.0,1.0,1.0);
	
	Spinning();
	
	var bottom = new Float32Array(
		[-1,-0.59,
		-1,-1,
		1,-0.59,
		1,-1]
	);

	gl.uniform4f(a_FragColor,1.0,0.0,1.0,1.0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, bottom, gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textures[9]);
	gl.uniform1i(gl.getUniformLocation(program, "uSampler"),0);
	
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
	
	bottom = new Float32Array(
		[-1,0.59,
		-1,1,
		1,0.59,
		1,1]
	);

	gl.uniform4f(a_FragColor,1.0,0.0,1.0,1.0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, bottom, gl.STATIC_DRAW);
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);
	
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, textures[9]);
	gl.uniform1i(gl.getUniformLocation(program, "uSampler"),0);
	
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}