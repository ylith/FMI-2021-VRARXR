
			// Ъгли и разстояние на гледната точка
			var alpha = 0.1;
			var beta = 1.1;
			var distance = 300;
			
			// Прехващане на мишката
			window.addEventListener( 'mousedown', onMouseDown, false );
			window.addEventListener( 'mousemove', onMouseMove, false );
			window.addEventListener( 'mouseup', onMouseUp, false );
			window.addEventListener( 'contextmenu', onContextMenu, false );
			
			// помощни променливи за работа с мишката
			var mouseButton = 0; // кой клавиш е натиснат
			var mouseX = 0; // координати на последна
			var mouseY = 0; // ...позиция на мишката
			
			// обработване на натискане на миши бутон
			function onMouseDown(event)
			{
				mouseButton = event.which;
				mouseX = event.clientX;
				mouseY = event.clientY;
			}

			// обработване на пускане на миши бутон
			function onMouseUp(event)
			{
				mouseButton = false;
			}

			// обработване на местене на мишката
			function onMouseMove(event)
			{
				if (!mouseButton) return; // ако не е натиснат бутон

				// изчисляване колко се е преместила мишката
				var dX = event.clientX-mouseX;
				var dY = event.clientY-mouseY;

				// натиснат е ляв бутон
				if (mouseButton==1)
				{
					alpha = alpha-dX/100;
					beta = THREE.Math.clamp(beta-dY/100,0.1,1.4);
				}
				
				// натиснат е десен бутон
				if (mouseButton==3)
				{
					distance = THREE.Math.clamp(distance+dY,50,300);
				}
				
				// запомняме къде е мишката
				mouseX = event.clientX;
				mouseY = event.clientY;
			}


			// обработване на контекстно меню с десен бутон
			function onContextMenu(event)
			{
				event.preventDefault();
			}
			
			function cameraAnimate(){
				
				// движение на гледната точка
				camera.position.setFromSphericalCoords(
					distance,
					beta, 
					alpha
				);
				camera.lookAt( new THREE.Vector3(0,20*distance/150,0) );			
			}