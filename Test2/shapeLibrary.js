function pineTree(segments=3, height=1)
{
	var tree = new THREE.Group();
	//tree.name = "pine";
	var material = new THREE.MeshPhongMaterial( {color: new THREE.Color(getRandom(0, 0.5), getRandom(0.4, 1), getRandom(0, 0.2))} );

	var radius = getRandom(height/4, height/2);
	var trunkRadius = (radius) * getRandom(0.1, 0.3);
	var startHeight = height * getRandom(0.2, 0.4);
	var currentHeight = startHeight;
	var heightLeft = height - startHeight;
	for (var i = 0; i < segments; i++) {
		var geo = new THREE.ConeGeometry( radius, heightLeft/segments, 8 );
		geo.translate(0, currentHeight, 0);
		var cone = mesh( geo, material );
		tree.add(cone);
		radius /= 1.5;
		currentHeight += heightLeft/segments;
	}
	var trunk = mesh( 
		new THREE.CylinderGeometry( trunkRadius, trunkRadius, startHeight, 16 ),
		new THREE.MeshPhongMaterial( {color: "brown"} )
	);
	trunk.position.y = startHeight/2;
	tree.add(trunk);

	return tree;
}

function tree(segments=5, height=1)
{
	var tree = new THREE.Group();
	//tree.name = "pine";
	var material = new THREE.MeshPhongMaterial( {color: new THREE.Color(Math.random() * 0.5, getRandom(0.5, 1), 0),
		transparent: true, opacity: 1, specular: "green", shininess: 0, flatShading: true} );

	var trunkHeight = height * getRandom(0.6, 0.85);
	var radius = (height - trunkHeight) / 2;
	var trunkRadius = (radius) * getRandom(0.3, 0.5);
	var startHeight = 0;
	var currentHeight = trunkHeight;

	for (var i = 0; i < segments; i++) {
		var r = getRandom(0.7, 1.5) * radius;
		var geo = new THREE.OctahedronGeometry( r, 2 );
		geo.translate(getRandom(-1.5, 1.5) * r/2, trunkHeight - r/2, getRandom(-1.5, 1.5) * r/2);
		var top = mesh( geo, material );
		tree.add(top);
	}
	var trunk = mesh(
		new THREE.CylinderGeometry( trunkRadius, trunkRadius, trunkHeight, 16 ),
		new THREE.MeshPhongMaterial( {color: "brown"} )
	);
	trunk.translateY(trunkHeight/2);
	// trunk.position.y = -1 * startHeight / 2;
	tree.add(trunk);

	return tree;
}

function wheel(radius = 10, segments = 10)
{
	var wheel = new THREE.Group();
	var geometry = new THREE.TorusGeometry( radius, radius/10, 5, segments );
	var material = new THREE.MeshPhongMaterial( { color: "#FFC0CB" } );
	var material2 = new THREE.MeshPhongMaterial( { color: "#8B0000" } );
	var torus = mesh( geometry, material );
	torus.name = "wheel";
	var segmentLength = 2 * Math.PI / segments;

	var size = radius/3;
	for (var i = 0; i < segments; i++) {
		var geo = emptyBox(size, size/2, size/2, radius/50, new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff}));
		geo.name = "cabin";
		var sin = Math.sin(segmentLength * i);
		var cos = Math.cos(segmentLength * i);
		geo.position.set(cos * (radius + size/2), sin * (radius + size/2), 0);
		// geo.rotateZ(Math.PI);
		torus.add(geo);

		var g = new THREE.BoxGeometry(radius/20, radius * 2, radius/20);
		g.rotateZ(segmentLength * i);
		torus.add(mesh(g , material2 ));
	}
	torus.position.y = 2 * radius;

	wheel.add(torus);
	var stand = mesh( 
		new THREE.CylinderGeometry( radius/25, radius/7, 2*radius, 16 ),
		material );
	stand.position.y = radius;
	wheel.add(stand);

	var s = mesh( 
		new THREE.BoxGeometry( radius, radius/10, radius ),
		material );
	wheel.add(s);

	return wheel;
}

function mesh(geometry, material)
{
	var m = new THREE.Mesh(geometry, material);
	m.castShadow = true;
	m.receiveShadow = true;

	return m;
}

function pavilion(height = 1, width = 1)
{
	var geometry = new THREE.CylinderGeometry( width/10, width, height, getRandom(4, 10), 1, true );
	setRandomVertexColors(geometry);
    var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors } );
	// var g = new THREE.CylinderGeometry( width/10, width, height, 6, 3, true, 0, 5.5 );
	// g.scale(0.8, 0.8, 0.8);
	geometry.translate(0, height/2, 0);
    var pavilion = mesh(geometry, material);
    // var inside = mesh(g, new THREE.MeshPhongMaterial({color: "brown", side: THREE.DoubleSide}));

    // pavilion.add(inside);

    return pavilion;
}

function setRandomVertexColors(geometry)
{
	for (var i = 0; i < geometry.faces.length; i++) {
	    geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
	}
}

function setRandomVertexColors2(geometry)
{
	for (var i = 0; i < geometry.faces.length; i+=2) {
		var color = Math.random() * 0xffffff;
	    geometry.faces[ i ].color.setHex( color );
	    geometry.faces[ i+1 ].color.setHex( color );
	}
}

function emptyBox(width, depth, height, thickness=1, material)
{
	material = typeof material !== 'undefined' ? material : new THREE.MeshPhongMaterial( { color: "grey" } );
	var w = width - thickness*2;
	var d = depth - thickness*2;
	var box = new THREE.Group();
	var bottomGeo = new THREE.BoxGeometry(w, thickness, depth);
	bottomGeo.translate(0, -height/2, 0);
	var bottom = mesh(bottomGeo , material );

	var l = new THREE.BoxGeometry(thickness, height, depth);
	l.translate(-1*w/2 - thickness/2, -thickness/2, 0);
	// var m1 = new THREE.MeshPhongMaterial( { color: "red", transparent:true, opacity:1 } );
	var left = mesh(l , material );


	var r = new THREE.BoxGeometry(thickness, height, depth);
	r.translate(w/2 + thickness/2, -thickness/2, 0);
	var right = mesh(r , material );


	// var m2 = new THREE.MeshPhongMaterial( { color: "green", transparent:true, opacity:1 } );
	var f = new THREE.BoxGeometry(width, height, thickness);
	f.translate(0, -thickness/2, depth/2);
	var front = mesh(f , material );


	var b = new THREE.BoxGeometry(width, height, thickness);
	b.translate(0, -thickness/2, -1 * depth/2);
	var back = mesh(b , material );

	box.add(bottom);
	box.add(left);
	box.add(right);
	box.add(front);
	box.add(back);

	return box;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function path()
{
	const curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
var shape = new THREE.Shape( points );
const material = new THREE.LinePhongMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
var extrudeSettings = {
    steps           : 1,
    bevelEnabled    : false,
    extrudePath     : curve
};
	var g = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	var mesh = mesh( geometry, material );
	scene.add( mesh );
}

function person(height, color, tshirtColor, pantsColor, widthScale=1, armRotMax=20)
{
	color = typeof color !== 'undefined' ? color : '#DEB887';
	tshirtColor = typeof tshirtColor !== 'undefined' ? tshirtColor : 'red';
	pantsColor = typeof pantsColor !== 'undefined' ? pantsColor : 'black';

	var headSize = height/getRandom(6.5, 8);
	var totalWidth = 2 *(headSize) * widthScale;
	var width = totalWidth - headSize/2;
	var person = new THREE.Group();
	var material = new THREE.MeshPhongMaterial( {color: color} );
	var material2 = new THREE.MeshPhongMaterial( {color: tshirtColor} );
	var material3 = new THREE.MeshPhongMaterial( {color: pantsColor} );

	var legLength = headSize * getRandom(3.5, 4);
	var legSize = width/2.3;
	var torsoLength = height-headSize-legLength;
	var body = mesh(new THREE.BoxGeometry(width, torsoLength, headSize*0.5), material2);
	body.translateY(legLength + torsoLength/2);

	var lLeg = mesh(new THREE.CylinderGeometry(legSize/2, legSize/2, legLength), material3);
	lLeg.translateY(legLength/2);
	lLeg.translateX(width/2 - legSize/2);
	var rLeg = mesh(new THREE.CylinderGeometry(legSize/2, legSize/2, legLength), material3);
	rLeg.translateX(-1*(width/2 - legSize/2));
	rLeg.translateY(legLength/2);
	person.add(lLeg);
	person.add(rLeg);

	var armSize = legSize/1.5;
	var armLength = torsoLength+headSize/2;
	var armGeo = new THREE.CylinderGeometry(armSize/3, armSize/3, armLength);
	armGeo.translate(0, -1*armLength/2, 0);
	var lArm = mesh(armGeo, material);
	lArm.translateY(legLength + torsoLength);
	var rArm = lArm.clone();
	rArm.translateX(-1*width/2);
	lArm.translateX(width/2);
	lArm.rotateZ(THREE.Math.degToRad(getRandom(0, armRotMax)));
	rArm.rotateZ(THREE.Math.degToRad(getRandom(0, -1*armRotMax)));
	person.add(lArm);
	person.add(rArm);

	var head = mesh(new THREE.BoxGeometry(headSize * 0.95, headSize, headSize * 0.8), material);
	head.translateY(legLength + torsoLength + headSize/2);
	person.add(head);

	person.add(body);

	return person;
}

function getRandomPerson(scale=1)
{
	var p = person(getRandom(1.5, 2) * scale, '#DEB887', Math.random() * 0xffffff, Math.random() * 0xffffff);
	p.rotation.set(0, getRandom(0, Math.PI), 0);

	return p;
}

function pavillion2(height, width, depth)
{
	var pavillion = new THREE.Group();
	pavillion.add(pavillionTop(height, width, depth));
	var box = emptyBox(width, depth, height/3);
	box.translateY(height/6);
	pavillion.add(box);

	return pavillion;
}

function pavillionTop(height, width, depth)
{
	var pavillion = new THREE.Group();
	var geometry = new THREE.PlaneGeometry( width, depth, 8 );
	var material = new THREE.MeshPhongMaterial( {color: "white", side: THREE.DoubleSide, vertexColors: THREE.FaceColors} );
	setRandomVertexColors2(geometry);
	var plane = mesh( geometry, material );

	var sideSize = Math.min(Math.max(depth/5, 0.1), 5);
	var geometry2 = new THREE.PlaneGeometry( width, sideSize, 32 );
	geometry2.rotateX(Math.PI/2);
	geometry2.translate(0, -1*depth/2, -1*sideSize/2);
	var material2 = new THREE.MeshPhongMaterial( {color: "blue", side: THREE.DoubleSide} );
	plane.add(mesh( geometry2, material2 ));

	var poleSize = Math.min(Math.max(depth/25, 0.1), 5);
	var poleGeo = new THREE.CylinderGeometry(poleSize, poleSize, height);
	var poleGeo2 = new THREE.CylinderGeometry(poleSize, poleSize, height);
	//poleGeo.translate((width/2 - 2 * poleSize), height/2 - height/10, depth/2 - 2 * poleSize);
	poleGeo.translate(width/2 - 2 * poleSize, -1*height/2, -1*depth/2 + 2 * poleSize);
	// poleGeo.rotateX(-1*Math.PI/2);
	poleGeo2.translate(-1*(width/2 - 2 * poleSize), -1*height/2, -1*depth/2 + 2 * poleSize);
	// poleGeo2.rotateX(-1*Math.PI/2);
	var pole = mesh(poleGeo, material2);
	var pole2 = mesh(poleGeo2, material2);
	// 	pole.translateX(width/2);
	// pole.translateY(height/2);
	// pole.translateZ( depth/2 - poleSize/2);
	// pole.translate(1, 1, 1);
	pavillion.add(pole);
	pavillion.add(pole2);
	plane.rotateX(-1 * (Math.PI/2 + THREE.Math.degToRad(20)));
	pavillion.add(plane);
	pavillion.translateY(height);

	return pavillion;
}

