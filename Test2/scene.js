// Общи настройки на сцената
function sceneInit()
{
	vaxInit();
	
	// включваме сенки
	renderer.shadowMap.enabled = true;
				
	// // фиксирана гледна точка
	// camera.position.set( 0, 100, 150 );
	// camera.lookAt( new THREE.Vector3(0,20,0) );

	// наличната светлина я правим по-слаба
	light = new THREE.PointLight();
	light.castShadow = true;
	light.intensity = 0.35;
	light.position.set( 0, 200, 150 );
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	scene.add( light );

	// const light2 = new THREE.PointLight();
	// light2.position.set(0,20,100);
	// light2.intensity = 0.75;
	// light2.castShadow = true;
	// scene.add( light2 );
	
	// околна светлина за по-бледи сенки
	ambientLight = new THREE.AmbientLight('gold',0.55);
	scene.add( ambientLight );
	
	// прожекторна светлина за сенки
	spotLight = new THREE.SpotLight('white',0.5,0,1.0,1.0);
	spotLight.shadow.mapSize = new THREE.Vector2( 1024*2, 1024*2 );
	spotLight.position.set( 0, 800, 0 );
	spotLight.castShadow = true;
	scene.add( spotLight );
}



// Създаване на обектите в сцената
function sceneObjects(radius)
{
	const loader = new THREE.TextureLoader();
	var ground = new THREE.Group();
	var offset = Math.PI/6;
	var radiusWithOffset = Math.sqrt(radius * radius + radius * radius - 2 * radius * radius * Math.cos(Math.PI - 2 * offset)) / 2;
	var yOffset = Math.sqrt(radius * radius - radiusWithOffset * radiusWithOffset);
	var geometry = new THREE.SphereGeometry( radius, 32, 32, 0, 2*Math.PI, 0, Math.PI/2 - offset);
	//const texture = loader.load( 'https://www.all3dfree.net/uploads/5/1/9/6/51967249/choppy_green_grass_textures_seamless_18.jpg' );
	var material = new THREE.MeshLambertMaterial( {color: "green"} );
	var material2 = new THREE.MeshPhongMaterial( {color: "darkgreen", side: THREE.DoubleSide} );
	gg = new THREE.Mesh( geometry, material2 );
	gg.rotateX(Math.PI);
	gg.receiveShadow = true;
	ground.add( gg );

	var topGeo = new THREE.CylinderGeometry(radiusWithOffset, radiusWithOffset, 5, 32);
	// topGeo.translate(0, -1 * radiusWithOffset/2, 0);
	var top = new THREE.Mesh(topGeo, material );
	top.receiveShadow = true;
	top.translateY(-1*yOffset);
	ground.add(top);
	scene.add(ground);
	ground.translateY(yOffset);
}