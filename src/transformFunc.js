function Rotate(vertices, angle)
{
	for (var i = 0; i < vertices.length; i+=2)
	{
		var x = vertices[i]*Math.cos(angle) - vertices[i+1]*Math.sin(angle);
		var y = vertices[i]*Math.sin(angle) + vertices[i+1]*Math.cos(angle);
		vertices[i] = x;
		vertices[i+1] = y;
	}
	return vertices;
}
function Translate(vertices, translate)
{
	var vert = new Float32Array(8);
	for (var i = 0; i < vertices.length; i+=2)
	{
		vert[i] = (vertices[i] + translate[0]);
		vert[i+1] = (vertices[i+1] + translate[1]);
	}
	return vert;
}