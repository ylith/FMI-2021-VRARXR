function setupLights(scene) {
	// var light2 = new THREE.PointLight();
	// light2.position.set(0,150,-300);
	// scene.add( light2 );

	createSpotlight(scene, 55, -200, 'red');
}

function createSpotlight(scene, posX, posY, posZ, color=0xffffff, debug) {
	var spotLight = new THREE.SpotLight( color );
	spotLight.position.set( 0, 55, -200 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );

	if (debug) {
		const spotLightHelper = new THREE.SpotLightHelper( spotLight );
		scene.add( spotLightHelper );
	}

	return spotLight;
}