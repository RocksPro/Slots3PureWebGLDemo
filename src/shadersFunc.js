var gl;
var a_Position;
var a_FragColor;
var aTextureCoord;
var program;
function initShaders(gl)
{
	var vertexShader = getShader("vertexshader");
	var fragmentShader = getShader("fragmentshader");
	
	program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	
	gl.linkProgram(program);
	
	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		alert("Link Error!");
	}
	
	gl.useProgram(program);
	gl.program = program;
	
	a_Position = gl.getAttribLocation(gl.program,"a_Position");
	a_FragColor = gl.getUniformLocation(gl.program,"a_FragColor");
	aTextureCoord = gl.getAttribLocation(gl.program,"aTextureCoord");
}

function getShader(id)
{
	var ShaderScript = document.getElementById(id);
	var str = "";
	var k = ShaderScript.firstChild;
	while (k)
	{
		if (k.nodeType == 3)
		{
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	var shader;
	
	if (id == "vertexshader")
	{
		shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else if (id == "fragmentshader")
	{
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else
	{
		return null;
	}
	
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert(id + gl.getShaderInfoLog(shader));
	}
	
	return shader;
}