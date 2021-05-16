function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


function createIcosahedron(size, posX, posY, posZ) {
	var icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(size), cubeMaterial4);
	icosahedron.position.set(posX, posY, posZ);
	return icosahedron;
}

function spawnCrystals(num, scene) {
	for (var i = 0; i < num; i++) {
		var crystal = createIcosahedron(50, i*50, i*50, i*50);
		scene.add(crystal);
	}
}