// Общи настройки на сцената
function sceneInit()
{
	vaxInit();
	
	// включваме сенки
	renderer.shadowMap.enabled = true;
				
	// фиксирана гледна точка
	camera.position.set( 0, 100, 150 );
	camera.lookAt( new THREE.Vector3(0,20,0) );

	// наличната светлина я правим по-слаба
	// light.intensity = 0.75;
	
	// околна светлина за по-бледи сенки
	ambientLight = new THREE.AmbientLight('gold',0.25);
	scene.add( ambientLight );
	
	// прожекторна светлина за сенки
	spotLight = new THREE.SpotLight('white',0.5,0,1.0,1.0);
	spotLight.shadow.mapSize = new THREE.Vector2( 1024*2, 1024*2 );
	spotLight.position.set( 0, 100, 0 );
	spotLight.target = new THREE.Object3D();
	spotLight.castShadow = true;
	scene.add( spotLight );
	scene.add( spotLight.target );
}



// Създаване на обектите в сцената
function sceneObjects()
{
	// земя
	ground = new THREE.Mesh(
		new THREE.BoxBufferGeometry(300,4,300),
		new THREE.MeshPhongMaterial({color:'lightgreen'})
	);
	ground.position.set( 0, -2, 0 );
	ground.receiveShadow = true;
	scene.add( ground );

	// обект
	object = new THREE.Mesh(
		new THREE.BoxBufferGeometry(8,8,8),
		new THREE.MeshLambertMaterial({color:'red'})
	);
	object.castShadow = true;
	scene.add( object );
}

function setRandomVertexColors(geometry)
{
	for (var i = 0; i < geometry.faces.length; i+=2) {
		var color = Math.random() * 0xffffff;
	    geometry.faces[ i ].color.setHex( color );
	    geometry.faces[ i+1 ].color.setHex( color );
	}
}


function dice(size=10)
{
	var offset = size/5;
	var halfSize = size/2;
	var geometry = new THREE.BoxGeometry( size, size, size );
	setRandomVertexColors(geometry);
    var material = new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors, transparent:true, opacity:1 } );

	var die = physicsBoxMesh(geometry, material, 1, 0, 1);
	die.name = "die";

	var dotMaterial = new THREE.MeshPhongMaterial({color:'black'});

	// var side = SIDE_ALIGNMENT.FRONT;
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.BOTTOM_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER_RIGHT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.TOP_RIGHT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));

	// side = SIDE_ALIGNMENT.BACK;
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.BOTTOM_LEFT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.CENTER_RIGHT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.TOP_RIGHT, offset, dotMaterial));
	// die.add(getDot(halfSize, side, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));

	//1
	die.add(getDot(halfSize, SIDE_ALIGNMENT.FRONT, DICE_ALIGNMENT.CENTER, offset, dotMaterial));
	//2
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BOTTOM, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BOTTOM, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));
	//3
	die.add(getDot(halfSize, SIDE_ALIGNMENT.RIGHT, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.RIGHT, DICE_ALIGNMENT.CENTER, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.RIGHT, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));
	//4
	die.add(getDot(halfSize, SIDE_ALIGNMENT.LEFT, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.LEFT, DICE_ALIGNMENT.TOP_RIGHT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.LEFT, DICE_ALIGNMENT.BOTTOM_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.LEFT, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));
	//5
	die.add(getDot(halfSize, SIDE_ALIGNMENT.TOP, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.TOP, DICE_ALIGNMENT.TOP_RIGHT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.TOP, DICE_ALIGNMENT.CENTER, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.TOP, DICE_ALIGNMENT.BOTTOM_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.TOP, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));
	//6
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.TOP_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.TOP_RIGHT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.CENTER_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.CENTER_RIGHT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.BOTTOM_LEFT, offset, dotMaterial));
	die.add(getDot(halfSize, SIDE_ALIGNMENT.BACK, DICE_ALIGNMENT.BOTTOM_RIGHT, offset, dotMaterial));

	return die;
}

const SIDE_ALIGNMENT = {
	TOP: "TOP",
	BOTTOM: "BOTTOM",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	FRONT: "FRONT",
	BACK: "BACK",
}

const DICE_ALIGNMENT = {
	TOP_LEFT: "TOP_LEFT",
	BOTTOM_LEFT: "BOTTOM_LEFT",
	TOP_RIGHT: "TOP_RIGHT",
	BOTTOM_RIGHT: "BOTTOM_RIGHT",
	CENTER: "CENTER",
	CENTER_LEFT: "CENTER_LEFT",
	CENTER_RIGHT: "CENTER_RIGHT",
}

const TRANSLATE = {
	NONE : 0,
	X: 1,
	Y: 2,
	Z: 4,
}

function getDot(halfSize, alignment, diceAlignment, offset, material)
{
	var size = halfSize / 7;
	var geo = new THREE.CylinderGeometry(size, size, size/2, 32);
	align(geo, alignment, halfSize);
	setDiceAlignment(geo, alignment, diceAlignment, halfSize, offset);
	var dot = new THREE.Mesh(geo, material);
	dot.castShadow = false;
	dot.receiveShadow = false;

	return dot;
}

function setDiceAlignment(geometry, alignment, diceAlignment, halfSize, offset=0)
{
	switch (alignment) {
		case SIDE_ALIGNMENT.TOP:
		setSide_TB_Alignment(geometry, diceAlignment, halfSize, offset);
		break;
		case SIDE_ALIGNMENT.BOTTOM:
		setSide_TB_Alignment(geometry, diceAlignment, halfSize, offset);
		break;
		case SIDE_ALIGNMENT.LEFT:
		setSide_LR_Alignment(geometry, diceAlignment, halfSize, TRANSLATE.Z, offset);
		break;
		case SIDE_ALIGNMENT.RIGHT:
		setSide_LR_Alignment(geometry, diceAlignment, halfSize, TRANSLATE.Z, offset);
		break;
		case SIDE_ALIGNMENT.FRONT:
		setSide_LR_Alignment(geometry, diceAlignment, halfSize, TRANSLATE.X, offset);
		break;
		case SIDE_ALIGNMENT.BACK:
		setSide_LR_Alignment(geometry, diceAlignment, halfSize, TRANSLATE.X, offset);
		break;
	}
}

function setSide_TB_Alignment(geometry, diceAlignment, halfSize, offset=0)
{
	switch (diceAlignment) {
		case DICE_ALIGNMENT.TOP_LEFT:
		geometry.translate(-halfSize + offset, 0, -halfSize + offset);
		break;
		case DICE_ALIGNMENT.BOTTOM_LEFT:
		geometry.translate(-halfSize + offset, 0, halfSize - offset);
		break;
		case DICE_ALIGNMENT.TOP_RIGHT:
		geometry.translate(halfSize - offset, 0, -halfSize + offset);
		break;
		case DICE_ALIGNMENT.BOTTOM_RIGHT:
		geometry.translate(halfSize - offset, 0, halfSize - offset);
		break;
		case DICE_ALIGNMENT.CENTER:
		break;
		case DICE_ALIGNMENT.CENTER_LEFT:
		geometry.translate(-halfSize + offset, 0, 0);
		break;
		case DICE_ALIGNMENT.CENTER_RIGHT:
		geometry.translate(halfSize - offset, 0, 0);
		break;
	}
}

function setSide_LR_Alignment(geometry, diceAlignment, halfSize, translate = TRANSLATE.NONE, offset=0)
{
	var leftTranslateX = translate & TRANSLATE.X ? -halfSize + offset : 0;
	var rightTranslateX = translate & TRANSLATE.X ? halfSize - offset : 0;
	var leftTranslateZ = translate & TRANSLATE.Z ? -halfSize + offset : 0;
	var rightTranslateZ = translate & TRANSLATE.Z ? halfSize - offset : 0;

	switch (diceAlignment) {
		case DICE_ALIGNMENT.TOP_LEFT:
		var left = 
		geometry.translate(leftTranslateX, halfSize - offset, leftTranslateZ);
		break;
		case DICE_ALIGNMENT.BOTTOM_LEFT:
		geometry.translate(leftTranslateX, -halfSize + offset, leftTranslateZ);
		break;
		case DICE_ALIGNMENT.TOP_RIGHT:
		geometry.translate(rightTranslateX, halfSize - offset, rightTranslateZ);
		break;
		case DICE_ALIGNMENT.BOTTOM_RIGHT:
		geometry.translate(rightTranslateX, -halfSize + offset, rightTranslateZ);
		break;
		case DICE_ALIGNMENT.CENTER:
		break;
		case DICE_ALIGNMENT.CENTER_LEFT:
		geometry.translate(leftTranslateX, 0, leftTranslateZ);
		break;
		case DICE_ALIGNMENT.CENTER_RIGHT:
		geometry.translate(rightTranslateX, 0, rightTranslateZ);
		break;
	}
}

// function setSide_FB_Alignment(geometry, diceAlignment, halfSize, offset=0)
// {
// 	switch (diceAlignment) {
// 		case DICE_ALIGNMENT.TOP_LEFT:
// 		geometry.translate(-halfSize + offset, halfSize - offset, 0);
// 		break;
// 		case DICE_ALIGNMENT.BOTTOM_LEFT:
// 		geometry.translate(-halfSize + offset, -halfSize + offset, 0);
// 		break;
// 		case DICE_ALIGNMENT.TOP_RIGHT:
// 		geometry.translate(halfSize - offset, halfSize - offset, 0);
// 		break;
// 		case DICE_ALIGNMENT.BOTTOM_RIGHT:
// 		geometry.translate(halfSize - offset, -halfSize + offset, 0);
// 		break;
// 		case DICE_ALIGNMENT.CENTER:
// 		break;
// 		case DICE_ALIGNMENT.CENTER_LEFT:
// 		geometry.translate(-halfSize + offset, 0, 0);
// 		break;
// 		case DICE_ALIGNMENT.CENTER_RIGHT:
// 		geometry.translate(halfSize - offset, 0, 0);
// 		break;
// 	}
// }

function align(geometry, alignment, halfSize)
{
	switch (alignment) {
		case "TOP":
		geometry.translate(0, halfSize, 0);
		break;
		case "BOTTOM":
		geometry.translate(0, -1 * halfSize, 0);
		break;
		case "LEFT":
		geometry.rotateZ(Math.PI/2);
		geometry.translate(-1 * halfSize, 0, 0);
		break;
		case "RIGHT":
		geometry.rotateZ(Math.PI/2);
		geometry.translate(halfSize, 0, 0);
		break;
		case "FRONT":
		geometry.rotateX(Math.PI/2);
		geometry.translate(0, 0, halfSize);
		break;
		case "BACK":
		geometry.rotateX(Math.PI/2);
		geometry.translate(0, 0, -1 * halfSize);
		break;
	}

	return geometry;
}

function emptyBox(width, depth, height, thickness=1, material)
{
	material = typeof material !== 'undefined' ? material : new THREE.MeshPhongMaterial( { color: "grey" } );
	var w = width - thickness*2;
	var d = depth - thickness*2;
	var box = new THREE.Group();
	var bottomGeo = new THREE.BoxBufferGeometry(w, thickness, depth);
	// bottomGeo.translate(0, -height/2, 0);

	var bottom =  new Physijs.BoxMesh(
		bottomGeo,
		Physijs.createMaterial(material,1,1),
		0
	);
	bottom.position.set( 0, -height/2, 0 );

	var l = new THREE.BoxBufferGeometry(thickness, height, depth);
	// var m1 = new THREE.MeshPhongMaterial( { color: "red", transparent:true, opacity:1 } );
	var left = physicsBoxMesh(l , material );
	left.position.set(-1*w/2 - thickness/2, -thickness/2, 0);

	var r = new THREE.BoxBufferGeometry(thickness, height, depth);
	var right = physicsBoxMesh(r , material );
	right.position.set(w/2 + thickness/2, -thickness/2, 0);


	// var m2 = new THREE.MeshPhongMaterial( { color: "green", transparent:true, opacity:1 } );
	var f = new THREE.BoxBufferGeometry(width, height, thickness);
	var front = physicsBoxMesh(f , material );
	front.position.set(0, -thickness/2, depth/2);


	var b = new THREE.BoxBufferGeometry(width, height, thickness);
	var back = physicsBoxMesh(b , material );
	back.position.set(0, -thickness/2, -1 * depth/2);

	bottom.add(left);
	bottom.add(right);
	bottom.add(front);
	bottom.add(back);

	return bottom;
}

function physicsBoxMesh(geometry, material, friction=1, restitution=1, mass=0)
{
	var m = new Physijs.BoxMesh(
		geometry, Physijs.createMaterial(material,friction,restitution), mass);
	m.castShadow = true;
	m.receiveShadow = true;

	return m;
}

