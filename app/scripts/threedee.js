// Detects webgl
		if ( ! Detector.webgl ) {
			Detector.addGetWebGLMessage();
			document.getElementById( 'container' ).innerHTML = "";
		}

		// - Global variables -

		// Graphics variables
		var container, stats;
		var camera, controls, scene, renderer;
		var textureLoader;
		var clock = new THREE.Clock();



///------------------- letter stuff ------

		var group, textMesh1, textMesh2, textGeo, materials;

	    var firstLetter = true;
	    var mainletter;

	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    var phrase = "supercomputingmachine";

	    var text = "S",

	        height = 10,
	        size = 70,
	        hover = 30,

	        curveSegments = 4,

	        bevelThickness = 20,
	        bevelSize = 1.5,
	        bevelSegments = 3,
	        bevelEnabled = true,

	        font = undefined,

	        fontName = "slukoni";//"optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
	        fontWeight = "medium";//"bold"; // normal bold

	    var mirror = false;

	    var fontMap = {

	        "helvetiker": 0,
	        "optimer": 1,
	        "gentilis": 2,
	        "droid/droid_sans": 3,
	        "droid/droid_serif": 4,
	        "slukoni": 5

	    };

	    var weightMap = {

	        "regular": 0,
	        "bold": 1

	    };

	     var postprocessing = { enabled : true, renderMode: 0 }; 


	    var depthMaterial, effectComposer, depthRenderTarget, composer;

	    var params = {
	      projection: 'normal',
	      background: false,
	      exposure: 1.0,
	      bloomStrength: 1.5,
	      bloomThreshold: 0.35,
	      bloomRadius: 0.4
	    };

	    var reverseFontMap = [];
	    var reverseWeightMap = [];

	    for ( var i in fontMap ) reverseFontMap[ fontMap[i] ] = i;
	    for ( var i in weightMap ) reverseWeightMap[ weightMap[i] ] = i;

///---------------------------------------


		var mouseCoords = new THREE.Vector2();
		var raycaster = new THREE.Raycaster();
		var ballMaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );

		// Physics variables
		var gravityConstant = 0;//7.8;
		var collisionConfiguration;
		var dispatcher;
		var broadphase;
		var solver;
		var physicsWorld;
		var margin = 0.05;

		var convexBreaker = new THREE.ConvexObjectBreaker();

		// Rigid bodies include all movable objects
		var rigidBodies = [];

		var pos = new THREE.Vector3();
		var quat = new THREE.Quaternion();
		var transformAux1 = new Ammo.btTransform();
		var tempBtVec3_1 = new Ammo.btVector3( 0, 0, 0 );

		var time = 0;

		var objectsToRemove = [];
		for ( var i = 0; i < 500; i++ ) {
			objectsToRemove[ i ] = null;
		}
		var numObjectsToRemove = 0;

		var impactPoint = new THREE.Vector3();
		var impactNormal = new THREE.Vector3();

		// - Main code -

		//init();
		initGraphics();
		


		// - Functions -
/*
		function init() {

			initGraphics();

			initPhysics();

			createObjects();

			initInput();

		}
*/
		function initGraphics() {

			container = document.getElementById( 'container' );

			camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 2000 );

			scene = new THREE.Scene();

			camera.position.x = -14;
			camera.position.y = 8;
			camera.position.z =  16;

		//	controls = new THREE.OrbitControls( camera );
		//	controls.target.y = 2;

			renderer = new THREE.WebGLRenderer({antialias:true, precision: "mediump"});
			renderer.setClearColor( 0xffff00 );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.shadowMap.enabled = true;

			textureLoader = new THREE.TextureLoader();
/*
			var ambientLight = new THREE.AmbientLight( 0x707070 );
			scene.add( ambientLight );
*/
			var light = new THREE.DirectionalLight( 0xffff00, 1 );
			light.position.set( -10, 18, 5 );
			light.castShadow = true;
			var d = 14;
			light.shadow.camera.left = -d;
			light.shadow.camera.right = d;
			light.shadow.camera.top = d;
			light.shadow.camera.bottom = -d;

			light.shadow.camera.near = 2;
			light.shadow.camera.far = 50;

			light.shadow.mapSize.x = 1024;
			light.shadow.mapSize.y = 1024;

			scene.add( light );

			materials = [
	            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
	            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
	        ];

			group = new THREE.Group();
	        group.position.y = 100;

	        scene.add( group );

	        console.log(fontName)
	        loadFont();
	        staticEffect();


			//container.innerHTML = "";

			container.appendChild( renderer.domElement );

			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			container.appendChild( stats.domElement );

			//

			window.addEventListener( 'resize', onWindowResize, false );

		}


		function loadFont() {

	        var loader = new THREE.FontLoader();
	        var typefile = 'fonts/' + fontName + '_' + fontWeight + '.typeface.json';
	        console.log(typefile);
	        loader.load( typefile, function ( response ) {

	            console.log('font loaded');

	            font = response;

	           // refreshText();
	            mainletter = createText('a');
	            scene.add(mainletter);

	          //  initPhysics()
	          	initPhysics();

				createObjects();

				initInput();

				animate();

	        } );

	    }

	    function refreshText() {


       var letter = createText(text);

        mainletter.geometry.dispose();
       // console.log(mainletter.geometry);
        mainletter.geometry = letter.geometry;

    }

    function createText(letter) {

        textGeo = new THREE.TextGeometry( letter, {

            font: font,

            size: size,
            height: height,
            curveSegments: curveSegments,

            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled,

            material: 0,
            extrudeMaterial: 1

        });

        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();



       
        var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

        textMesh1 = new THREE.Mesh( textGeo, materials );

        textMesh1.position.x = 0;//centerOffset;
        textMesh1.position.y = 0;//hover+ height;
        textMesh1.position.z = 0;

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        var boxHelper = new THREE.BoxHelper( textMesh1 );
		boxHelper.material.color.set( 0xff0000 );
		//textMesh1.add( boxHelper );


        textMesh1.scale.set(.03,.03,.03)



        //scene.add( textMesh1 );

        return textMesh1;


       

        

    }

		function initPhysics() {

			// Physics configuration

			collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
			dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
			broadphase = new Ammo.btDbvtBroadphase();
			solver = new Ammo.btSequentialImpulseConstraintSolver();
			physicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration );
			physicsWorld.setGravity( new Ammo.btVector3( 0, - gravityConstant, 0 ) );

		}

		function createObject( mass, halfExtents, pos, quat, material ) {

			var object = new THREE.Mesh( new THREE.BoxGeometry( halfExtents.x * 2, halfExtents.y * 2, halfExtents.z * 2 ), material );
			object.position.copy( pos );
			object.quaternion.copy( quat );
			convexBreaker.prepareBreakableObject( object, mass, new THREE.Vector3(), new THREE.Vector3(), true );
			createDebrisFromBreakableObject( object );

		}

		function createObjects() {

			// Ground
	/*		pos.set( 0, - 0.5, 0 );
			quat.set( 0, 0, 0, 1 );
			var ground = createParalellepipedWithPhysics( 40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
			ground.receiveShadow = true;
			*/
	
/*
			// Tower 1
			var towerMass = 1000;
			var towerHalfExtents = new THREE.Vector3( 2, 5, 2 );
			pos.set( -8, 5, 0 );
			quat.set( 0, 0, 0, 1 );
			createObject( towerMass, towerHalfExtents, pos, quat, createMaterial( 0xF0A024 ) );
*/
		//	createWall();
			createBalls();
/*
			// Tower 2
			pos.set( 8, 5, 0 );
			quat.set( 0, 0, 0, 1 );
			createObject( towerMass, towerHalfExtents, pos, quat, createMaterial( 0xF4A321 ) );

			//Bridge
			var bridgeMass = 100;
			var bridgeHalfExtents = new THREE.Vector3( 7, 0.2, 1.5 );
			pos.set( 0, 10.2, 0 );
			quat.set( 0, 0, 0, 1 );
			createObject( bridgeMass, bridgeHalfExtents, pos, quat, createMaterial( 0xB38835 ) );
*/
/*
			// Stones
			var stoneMass = 120;
			var stoneHalfExtents = new THREE.Vector3( 1, 2, 0.15 );
			var numStones = 8;
			quat.set( 0, 0, 0, 1 );
			for ( var i = 0; i < numStones; i++ ) {

				pos.set( 0, 2, 15 * ( 0.5 - i / ( numStones + 1 ) ) );

				createObject( stoneMass, stoneHalfExtents, pos, quat, createMaterial( 0xB0B0B0 ) );

			}
			*/
/*
			// Mountain
			var mountainMass = 860;
			var mountainHalfExtents = new THREE.Vector3( 4, 5, 4 );
			pos.set( 5, mountainHalfExtents.y * 0.5, - 7 );
			quat.set( 0, 0, 0, 1 );
			var mountainPoints = [];
			mountainPoints.push( new THREE.Vector3( mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z ) );
			mountainPoints.push( new THREE.Vector3( - mountainHalfExtents.x, - mountainHalfExtents.y, mountainHalfExtents.z ) );
			mountainPoints.push( new THREE.Vector3( mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z ) );
			mountainPoints.push( new THREE.Vector3( - mountainHalfExtents.x, - mountainHalfExtents.y, - mountainHalfExtents.z ) );
			mountainPoints.push( new THREE.Vector3( 0, mountainHalfExtents.y, 0 ) );
			var mountain = new THREE.Mesh( new THREE.ConvexGeometry( mountainPoints ), createMaterial( 0xFFB443 ) );
			mountain.position.copy( pos );
			mountain.quaternion.copy( quat );
			convexBreaker.prepareBreakableObject( mountain, mountainMass, new THREE.Vector3(), new THREE.Vector3(), true );
			createDebrisFromBreakableObject( mountain );
			*/

		}

		function createParalellepipedWithPhysics( sx, sy, sz, mass, pos, quat, material ) {

			var object = new THREE.Mesh( new THREE.BoxGeometry( sx, sy, sz, 1, 1, 1 ), material );
			var shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
			shape.setMargin( margin );

			var ballBody = createRigidBody( object, shape, mass, pos, quat );

			return object;

		}



		function createWall(){
			// Wall
			var brickMass = 0.5;
			var brickLength = 1.2;
			var brickDepth = 0.6;
			var brickHeight = brickLength * 0.5;
			var numBricksLength = 6;
			var numBricksHeight = 8;
			var z0 = - numBricksLength * brickLength * 0.5;
			pos.set( 0, brickHeight * 0.5, z0 );
			quat.set( 0, 0, 0, 1 );
			for ( var j = 0; j < numBricksHeight; j ++ ) {

				var oddRow = ( j % 2 ) == 1;

				pos.z = z0;

				if ( oddRow ) {
					pos.z -= 0.25 * brickLength;
				}

				var nRow = oddRow? numBricksLength + 1 : numBricksLength;
				for ( var i = 0; i < nRow; i ++ ) {

					var brickLengthCurrent = brickLength;
					var brickMassCurrent = brickMass;
					if ( oddRow && ( i == 0 || i == nRow - 1 ) ) {
						brickLengthCurrent *= 0.5;
						brickMassCurrent *= 0.5;
					}

					var brick = createParalellepipedWithPhysics( brickDepth, brickHeight, brickLengthCurrent, brickMassCurrent, pos, quat, createMaterial() );


					brick.castShadow = true;
					brick.receiveShadow = true;

					if ( oddRow && ( i == 0 || i == nRow - 2 ) ) {
						pos.z += 0.75 * brickLength;
					}
					else {
						pos.z += brickLength;
					}

				}
				pos.y += brickHeight;
			}

		}

		function createRigidBody( object, physicsShape, mass, pos, quat, vel, angVel ) {

			if ( pos ) {
				object.position.copy( pos );
			}
			else {
				pos = object.position;
			}
			if ( quat ) {
				object.quaternion.copy( quat );
			}
			else {
				quat = object.quaternion;
			}

			var transform = new Ammo.btTransform();
			transform.setIdentity();
			transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
			transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
			var motionState = new Ammo.btDefaultMotionState( transform );

			var localInertia = new Ammo.btVector3( 0, 0, 0 );
			physicsShape.calculateLocalInertia( mass, localInertia );

			var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
			var body = new Ammo.btRigidBody( rbInfo );

			body.setFriction( 0.5 );

			if ( vel ) {
				body.setLinearVelocity( new Ammo.btVector3( vel.x, vel.y, vel.z ) );
			}
			if ( angVel ) {
				body.setAngularVelocity( new Ammo.btVector3( angVel.x, angVel.y, angVel.z ) );
			}

			object.userData.physicsBody = body;
			object.userData.collided = false;

			scene.add( object );

			if ( mass > 0 ) {
				rigidBodies.push( object );

				// Disable deactivation
				body.setActivationState( 4 );
			}

			physicsWorld.addRigidBody( body );

			return body;
		}

		function createRandomColor() {
			return Math.floor( Math.random() * ( 1 << 24 ) );
		}

		function createMaterial( color ) {
			color = color || createRandomColor();
			return new THREE.MeshPhongMaterial( { color: color } );
		}

		function createBalls(){

			var ballMass = .35;
			var ballRadius = 1;//0.4;

			for ( var j = 0; j < 100; j ++ ) {

				var char = phrase.charAt(j%21)
                var ball = createText(char);

			//	var ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), ballMaterial );
				ball.castShadow = true;
				ball.receiveShadow = true;
				var ballShape = new Ammo.btSphereShape( ballRadius );
				ballShape.setMargin( margin );

				//pos = new THREE.Vector3(10,0,10);
				pos.x = Math.random()* 200 - 100;
				pos.y = Math.random()* 200 - 100;
				pos.z = Math.random()* 200 - 100;
				//pos.copy( raycaster.ray.direction );
				//pos.add( raycaster.ray.origin );
				quat.set( 0, 0, 0, 1 );
				var ballBody = createRigidBody( ball, ballShape, ballMass, pos, quat );
				ballBody.setFriction( 0.9 );

				var direction = new THREE.Vector3();
 				direction.subVectors( new THREE.Vector3(0,4,0), pos ).normalize() ;
 				

				pos.copy( direction );
				pos.multiplyScalar( 10 );
				ballBody.setLinearVelocity( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
			}
		}

		function initInput() {

			document.addEventListener( 'keypress', onDocumentKeyPress, false );

			window.addEventListener( 'mousedown', function( event ) {

				mouseCoords.set(
					( event.clientX / window.innerWidth ) * 2 - 1,
					- ( event.clientY / window.innerHeight ) * 2 + 1
				);

				raycaster.setFromCamera( mouseCoords, camera );

				// Creates a ball and throws it
				var ballMass = 35;
				var ballRadius = 0.4;

				var ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), ballMaterial );
				ball.castShadow = true;
				ball.receiveShadow = true;
				var ballShape = new Ammo.btSphereShape( ballRadius );
				ballShape.setMargin( margin );
				pos.copy( raycaster.ray.direction );
				pos.add( raycaster.ray.origin );
				quat.set( 0, 0, 0, 1 );
				var ballBody = createRigidBody( ball, ballShape, ballMass, pos, quat );
				
				pos.copy( raycaster.ray.direction );
				pos.multiplyScalar( 24 );
				ballBody.setLinearVelocity( new Ammo.btVector3( pos.x, pos.y, pos.z ) );

			}, false );

		}

		function onDocumentKeyDown( event ) {

               

            var keyCode = event.keyCode;

            console.log(keycode)

            // backspace

            if ( keyCode == 8 ) {

                event.preventDefault();

                text = text.substring( 0, text.length - 1 );
                refreshText();

                return false;

            }

        }

        function onDocumentKeyPress( event ) {

            var keyCode = event.which;

            // backspace

            if ( keyCode == 8 ) {

                event.preventDefault();

            } else {

                var ch = String.fromCharCode( keyCode );
                text = ch;
                console.log('text is '+ text)

                refreshText();
               // createLetter(ch, 1);

            }

        }

		function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}

		function animate() {

			requestAnimationFrame( animate );

			render();
			//stats.update();

		}

		function render() {

			var deltaTime = clock.getDelta();

			updatePhysics( deltaTime );

		//	controls.update( deltaTime );

			//renderer.render( scene, camera );

			if ( postprocessing.enabled ) {

				renderer.toneMappingExposure = Math.pow( params.exposure, 4.0 );
				composer.render(deltaTime);

			} else {

				renderer.render( scene, camera );

			}

			time += deltaTime;

		}

		function updatePhysics( deltaTime ) {

			// Step world
			physicsWorld.stepSimulation( deltaTime, 10 );

			// Update rigid bodies
			for ( var i = 0, il = rigidBodies.length; i < il; i++ ) {
				var objThree = rigidBodies[ i ];
				var objPhys = objThree.userData.physicsBody;
				var ms = objPhys.getMotionState();
				if ( ms ) {

					ms.getWorldTransform( transformAux1 );
					var p = transformAux1.getOrigin();
					var q = transformAux1.getRotation();
					objThree.position.set( p.x(), p.y(), p.z() );
					objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

					objThree.userData.collided = false;

				}
			}

			for ( var i = 0, il = dispatcher.getNumManifolds(); i < il; i ++ ) {

				var contactManifold = dispatcher.getManifoldByIndexInternal( i );
				var rb0 = contactManifold.getBody0();
				var rb1 = contactManifold.getBody1();

				var threeObject0 = Ammo.castObject( rb0.getUserPointer(), Ammo.btVector3 ).threeObject;
				var threeObject1 = Ammo.castObject( rb1.getUserPointer(), Ammo.btVector3 ).threeObject;

				if ( ! threeObject0 && ! threeObject1 ) {
					continue;
				}

				var userData0 = threeObject0 ? threeObject0.userData : null;
				var userData1 = threeObject1 ? threeObject1.userData : null;

				var breakable0 = userData0 ? userData0.breakable : false;
				var breakable1 = userData1 ? userData1.breakable : false;

				var collided0 = userData0 ? userData0.collided : false;
				var collided1 = userData1 ? userData1.collided : false;

				if ( ( ! breakable0 && ! breakable1 ) || ( collided0 && collided1 ) ) {
					continue;
				}

				var contact = false;
				var maxImpulse = 0;
				for ( var j = 0, jl = contactManifold.getNumContacts(); j < jl; j ++ ) {
					var contactPoint = contactManifold.getContactPoint( j );
					if ( contactPoint.getDistance() < 0 ) {
						contact = true;
						var impulse = contactPoint.getAppliedImpulse();
						if ( impulse > maxImpulse ) {
							maxImpulse = impulse;
							var pos = contactPoint.get_m_positionWorldOnB();
							var normal = contactPoint.get_m_normalWorldOnB();
							impactPoint.set( pos.x(), pos.y(), pos.z() );
							impactNormal.set( normal.x(), normal.y(), normal.z() );
						}
						break;
					}
				}
/*
				// If no point has contact, abort
				if ( ! contact ) {
					continue;
				}
				*/
			}

		}



		function staticEffect(){
            var renderPass = new THREE.RenderPass(scene, camera);
            var effectFilm = new THREE.FilmPass(0.8, 0.325, 1400, false);
            effectFilm.renderToScreen = true;

            composer = new THREE.EffectComposer(renderer);
            composer.addPass(renderPass);
            composer.addPass(effectFilm);

            /*
            var colorifyPass = new THREE.ShaderPass( THREE.ColorifyShader );
			colorifyPass.uniforms[ "color" ].value = new THREE.Color( 0xffff00 );
			colorifyPass.renderToScreen = true;
			composer.addPass( colorifyPass );
*/

            // setup the control gui
            var controls = new function () {
                this.scanlinesCount = 1400;
                this.grayscale = false;
                this.scanlinesIntensity = 0.3;
                this.noiseIntensity = 0.8;

                this.updateEffectFilm = function () {
                    effectFilm.uniforms.grayscale.value = controls.grayscale;
                    effectFilm.uniforms.nIntensity.value = controls.noiseIntensity;
                    effectFilm.uniforms.sIntensity.value = controls.scanlinesIntensity;
                    effectFilm.uniforms.sCount.value = controls.scanlinesCount;
                };
            };


            var gui = new dat.GUI();
            gui.add(controls, "scanlinesIntensity", 0, 1).onChange(controls.updateEffectFilm);
            gui.add(controls, "noiseIntensity", 0, 3).onChange(controls.updateEffectFilm);
            gui.add(controls, "grayscale").onChange(controls.updateEffectFilm);
            gui.add(controls, "scanlinesCount", 0, 2048).step(1).onChange(controls.updateEffectFilm);
        }
