
	    THREE.ShapeUtils.triangulateShape = ( function () {
	        var pnlTriangulator = new PNLTRI.Triangulator();
	        function removeDupEndPts(points) {

	            var l = points.length;

	            if ( l > 2 && points[ l - 1 ].equals( points[ 0 ] ) ) {

	                points.pop();

	            }

	        }

	        return function triangulateShape( contour, holes ) {
	            // console.log("new Triangulation: PnlTri.js " + PNLTRI.REVISION );

	            removeDupEndPts( contour );
	            holes.forEach( removeDupEndPts );

	            return pnlTriangulator.triangulate_polygon( [ contour ].concat(holes) );
	        };
	    } )();
 // Detects webgl
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        document.getElementById('container').innerHTML = "";
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

    var letterMax = 300;
    var renderActive = true;

    var phrase = "supercomputingmachine";
    var letterArr = [];
    var showHelpers = false; //true;

    var phraseArr = [
        "super",
        "computing",
        "machine"
    ]

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

        fontName = "Slukoni"; //"optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = "Medium"; //"bold"; // normal bold

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

    var postprocessing = {
        enabled: true,
        renderMode: 0
    };


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

    for (var i in fontMap) reverseFontMap[fontMap[i]] = i;
    for (var i in weightMap) reverseWeightMap[weightMap[i]] = i;

    var t;
    var baseline = -10;
    var vert = 20;

    function logout() {
      //  console.log("You are now logged out.")
        baseline = -10;
        vert = 20;
        //location.href = 'logout.php'
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 1000)
            // 1000 milisec = 1 sec
    }

    var typeInterval;
    var typeProgress = 0;

     var targetRotationY = 0;
    var targetRotationOnMouseDownY = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var rotateActive = false;

     var targetRotationX = 0;
    var targetRotationOnMouseDownX = 0;

    var mouseY = 0;
    var mouseYOnMouseDown = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;



    ///---------------------------------------


    var mouseCoords = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();
    var ballMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000
    });

    // Physics variables
    var gravityConstant = 0; //7.8;
    var collisionConfiguration;
    var dispatcher;
    var broadphase;
    var solver;
    var physicsWorld;
    var margin = 0.05;

    var cycle = 0;
  //  var convexBreaker = new THREE.ConvexObjectBreaker();

    // Rigid bodies include all movable objects
    var rigidBodies = [];

    var pos = new THREE.Vector3();
    var quat = new THREE.Quaternion();
    var transformAux1 = new Ammo.btTransform();
    var tempBtVec3_1 = new Ammo.btVector3(0, 0, 0);

    var time = 0;

    var objectsToRemove = [];
    for (var i = 0; i < 500; i++) {
        objectsToRemove[i] = null;
    }
    var numObjectsToRemove = 0;

    var impactPoint = new THREE.Vector3();
    var impactNormal = new THREE.Vector3();

    // - Main code -

    //init();
   // initGraphics();



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

        container = document.getElementById('container');

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);

        scene = new THREE.Scene();

        camera.position.x = -20;
        camera.position.y = -10;
        camera.position.z = 25;

        camera.lookAt(new THREE.Vector3(0, 2, 0));

    //    controls = new THREE.OrbitControls(camera);
    //    controls.target.y = 2;

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            precision: "mediump",
            alpha: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        textureLoader = new THREE.TextureLoader();

        var ambientLight = new THREE.AmbientLight(0x707070);
        scene.add(ambientLight);

        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-10, 18, 5);
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

        scene.add(light);
        /*
        			materials = [
        	            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
        	            new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
        	        ];
        */
        materials = [
            new THREE.MeshPhongMaterial({
                color: 0xcccc00,
                shading: THREE.SmoothShading
            }), // front
            new THREE.MeshPhongMaterial({
                color: 0xcccc00,
                shading: THREE.SmoothShading
            }) // side
        ];

      //  group = new THREE.Group();
        //group.position.y = 100;

     //   scene.add(group);

       // console.log(fontName)
        loadFont();
        staticEffect();


        //container.innerHTML = "";

        container.appendChild(renderer.domElement);
/*
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
*/
        //

        window.addEventListener('resize', onWindowResize, false);

    }


    function loadFont() {

        var loader = new THREE.FontLoader();
        var typefile = 'fonts/' + fontName + '_' + fontWeight + '.typeface.json';
       // console.log(typefile);
        loader.load(typefile, function(response) {

          //  console.log('font loaded');

            font = response;

            // refreshText();
            //  mainletter = createText('a');
            //  scene.add(mainletter);

            //  initPhysics()
            initPhysics();

          //  createObjects();

            initInput();

            addWords();

            animate();

        });

    }

    function refreshText() {


        // var letter = createText(text);

        //  mainletter.geometry.dispose();
        // console.log(mainletter.geometry);
        //   mainletter.geometry = letter.geometry;

    }

    function createText(letter, speed = 10) {

     //   console.log('createText = ' + letter)

        var obj = new THREE.Object3D();
        scene.add(obj);
        letterArr.push(obj)

        textGeo = new THREE.TextGeometry(letter, {

            font: font,

            size: 5, //size,
            height: 2, //height,
            curveSegments: curveSegments,

            bevelThickness: .25, //bevelThickness,
            bevelSize: .1, //,
            bevelEnabled: bevelEnabled,

            material: 0,
            extrudeMaterial: 1

        });

        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        // console.log(textGeo)




        var widthOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
        var heightOffset = -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
        var depthOffset = -0.5 * (textGeo.boundingBox.max.z - textGeo.boundingBox.min.z); // +margin;

        textMesh1 = new THREE.Mesh(textGeo, materials);

        textMesh1.position.x = widthOffset;
        textMesh1.position.y = heightOffset; //hover+ height;
        textMesh1.position.z = depthOffset;

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        var boxHelper = new THREE.BoxHelper(textMesh1);
        boxHelper.material.color.set(0xff0000);
        boxHelper.name = "wire";
        boxHelper.visible = showHelpers;
        obj.add(boxHelper);

        /// box ////

        var box = new THREE.Box3().setFromObject(obj);
        var sx = box.getSize().x,
            sy = box.getSize().y,
            sz = box.getSize().z;

        var objectSize = 3;
        //var sx = 5;
        //var sy = 5;
        //var sz = 2.75;
        threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), new THREE.MeshBasicMaterial({
            color: 0xff3300,
            wireframe: false,
            transparent: true,
            opacity: .3
        }));
        threeObject.name = "volume";
        threeObject.visible = showHelpers;


        obj.add(threeObject)

        //   textMesh1.scale.set(.03,.03,.03)
        /*
             	var box = new THREE.Box3().setFromObject( textMesh1 );
             	console.log('---from createText-----')

             	console.log(boxHelper)
                        console.log(letter)
        				console.log( box.getSize() );
        		console.log('---- end -------')
        */


        obj.add(textMesh1);

        var letterMass = .35;






      //  console.log(box.getSize())

        //var letterShape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
        var letterShape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));


        letterShape.setMargin(margin);
        //letterShape.setMargin( 0 );


        //var letterShape = new Ammo.btSphereShape( letterRadius );
        //letterShape.setMargin( margin );

        //pos = new THREE.Vector3(10,0,10);
        /*
        		pos.x = Math.random()*20;
        		pos.y = (4-cycle)*10;//Math.random()* 200 - 100;
        		pos.z = camera.position.z;//Math.random()* 100;// - 100;
        		*/

        var orbitRadius = 20;
        pos.x = Math.cos(baseline) * orbitRadius * 2; //baseline;
        pos.y = vert; //8;//camera.position.y;
        pos.z = Math.sin(baseline) * orbitRadius; //Math.random()* 20;
        baseline -= .25;



        //pos.copy( raycaster.ray.direction );
        //pos.add( raycaster.ray.origin );
        quat.set(0, 0, 0, 1);
        var letterBody = createRigidBody(obj, letterShape, letterMass, pos, quat);
        //var letterBody = createRigidBody( letter, letterShape, letterMass, pos, quat );
        letterBody.setFriction(0.3);

        var direction = new THREE.Vector3();
        direction.subVectors(new THREE.Vector3(0, 0, 0), pos).normalize();

        //pos.copy( raycaster.ray.direction );


        pos.copy(direction);
        //pos.multiplyScalar( 5+ (cycle*10) );
        pos.multiplyScalar(speed)
        letterBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));

        return obj;






    }

    function createBox(letter) {
        var objectSize = 3;
        var sx = 5;
        var sy = 5;
        var sz = 2.75;
        threeObject = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), new THREE.MeshBasicMaterial({
            color: 0xff3300,
            wireframe: false,
            transparent: true,
            opacity: .3
        }));


        var nLetter = createText(letter);

        threeObject.add(nLetter)

        threeObject.userData.letter = letter;

        return threeObject;
    }

    function initPhysics() {

        // Physics configuration

        collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        broadphase = new Ammo.btDbvtBroadphase();
        solver = new Ammo.btSequentialImpulseConstraintSolver();
        physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        physicsWorld.setGravity(new Ammo.btVector3(0, -gravityConstant, 0));

    }

   

    function createParalellepipedWithPhysics(sx, sy, sz, mass, pos, quat, material) {

        var object = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1), material);
        var shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
        shape.setMargin(margin);

        var ballBody = createRigidBody(object, shape, mass, pos, quat);

        return object;

    }



    function createWall() {
        // Wall
        var brickMass = 0.5;
        var brickLength = 1.2;
        var brickDepth = 0.6;
        var brickHeight = brickLength * 0.5;
        var numBricksLength = 6;
        var numBricksHeight = 8;
        var z0 = -numBricksLength * brickLength * 0.5;
        pos.set(0, brickHeight * 0.5, z0);
        quat.set(0, 0, 0, 1);
        for (var j = 0; j < numBricksHeight; j++) {

            var oddRow = (j % 2) == 1;

            pos.z = z0;

            if (oddRow) {
                pos.z -= 0.25 * brickLength;
            }

            var nRow = oddRow ? numBricksLength + 1 : numBricksLength;
            for (var i = 0; i < nRow; i++) {

                var brickLengthCurrent = brickLength;
                var brickMassCurrent = brickMass;
                if (oddRow && (i == 0 || i == nRow - 1)) {
                    brickLengthCurrent *= 0.5;
                    brickMassCurrent *= 0.5;
                }

                var brick = createParalellepipedWithPhysics(brickDepth, brickHeight, brickLengthCurrent, brickMassCurrent, pos, quat, createMaterial());


                brick.castShadow = true;
                brick.receiveShadow = true;

                if (oddRow && (i == 0 || i == nRow - 2)) {
                    pos.z += 0.75 * brickLength;
                } else {
                    pos.z += brickLength;
                }

            }
            pos.y += brickHeight;
        }

    }

    function createRigidBody(object, physicsShape, mass, pos, quat, vel, angVel) {

        if (pos) {
            object.position.copy(pos);
        } else {
            pos = object.position;
        }
        if (quat) {
            object.quaternion.copy(quat);
        } else {
            quat = object.quaternion;
        }

        var transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        var motionState = new Ammo.btDefaultMotionState(transform);

        var localInertia = new Ammo.btVector3(0, 0, 0);
        physicsShape.calculateLocalInertia(mass, localInertia);

        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);
        //console.log(body)

        body.setFriction(0.5);

        if (vel) {
            body.setLinearVelocity(new Ammo.btVector3(vel.x, vel.y, vel.z));
        }
        if (angVel) {
            body.setAngularVelocity(new Ammo.btVector3(angVel.x, angVel.y, angVel.z));
        }

        object.userData.physicsBody = body;
        object.userData.collided = false;

        scene.add(object);

        if (mass > 0) {
            rigidBodies.push(object);

            // Disable deactivation
            body.setActivationState(4);
        }

        physicsWorld.addRigidBody(body);

        return body;
    }

    function createRandomColor() {
        return Math.floor(Math.random() * (1 << 24));
    }

    function createMaterial(color) {
        color = color || createRandomColor();
        return new THREE.MeshPhongMaterial({
            color: color
        });
    }

    function cleanupPhysics(){

    	console.log('cleanupPhysics')
	     for (var i = 0; i < rigidBodies.length; i++) {

	        removeObjects(rigidBodies[i]);


	    }
	    rigidBodies = [];
	    
	}

    function removeObjects(object) {

        // console.log(object)

        scene.remove(object);
        physicsWorld.removeRigidBody(object.userData.physicsBody);

    }

    function cleanupOldies(){

    	if (rigidBodies.length > letterMax){
    	//	console.log('--- overload! -- ' + rigidBodies.length)
    		var num = rigidBodies.length - letterMax;
    	//	console.log(num)
    		for (var i = 0; i < num; i++) {
		        removeObjects(rigidBodies[i]);
		  //      console.log(rigidBodies[i])
		    }
    		rigidBodies.splice(0,num);
    		//console.log(rigidBodies.length)
    	}
    	//removeObjects(rigidBodies[i]);
    }

    function createBalls() {

        var ballMass = .35;
        var ballRadius = 1; //0.4;

        for (var j = 0; j < 100; j++) {

            var char = phrase.charAt(j % 21)
            var ball = createText(char);

            //	var ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), ballMaterial );
            ball.castShadow = true;
            ball.receiveShadow = true;
            var ballShape = new Ammo.btSphereShape(ballRadius);
            ballShape.setMargin(margin);

            //pos = new THREE.Vector3(10,0,10);
            pos.x = Math.random() * 200 - 100;
            pos.y = Math.random() * 200 - 100;
            pos.z = Math.random() * 200 - 100;
            //pos.copy( raycaster.ray.direction );
            //pos.add( raycaster.ray.origin );
            quat.set(0, 0, 0, 1);
            var ballBody = createRigidBody(ball, ballShape, ballMass, pos, quat);
            ballBody.setFriction(0.9);

            var direction = new THREE.Vector3();
            direction.subVectors(new THREE.Vector3(0, 4, 0), pos).normalize();


            pos.copy(direction);
            pos.multiplyScalar(10);
            ballBody.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));
        }
    }

    function addWords() {
        baseline = -10;
        vert = 20;
        typeInterval = setInterval(typeWords, 100);




        ///clearInterval(refreshIntervalId);
    }

    function typeWords() {

        var word = "Super Computing Machine"
        var char = word.charAt(typeProgress);
        if (char == " ") {
            vert -= 15;
            baseline = -10;
        }
        var letter = createText(char, 6);
        if (typeProgress == word.length) {
          //  console.warn('end of phrase');
            typeProgress = 0;
            clearInterval(typeInterval);

        } else {
            typeProgress++;
        }





    }



    function addPhrase(word, origin, speed = 20) {

        var letterMass = .35;
        var letterRadius = 1; //0.4;

        for (var j = 0; j < word.length; j++) {

            var char = word.charAt(j)
            var letter = createText(char);
            //  var letter = createBox(char);

          //  console.log(char)
            var box = new THREE.Box3().setFromObject(letter);
            //   console.log(box)
            //	console.log( box.min, box.max, box.getSize().z );



            //	var ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), ballMaterial );
            letter.castShadow = true;
            letter.receiveShadow = true;
            /*
            				var sx = box.getSize().x,
            					sy = box.getSize().y,
            					sz = box.getSize().z;

            				console.log(box.getSize())

            				//var letterShape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
            				var letterShape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );

            				console.log('lettershape ');
            				console.log(letterShape)

            				//letterShape.setMargin( margin );
            				//letterShape.setMargin( 0 );


            				//var letterShape = new Ammo.btSphereShape( letterRadius );
            				//letterShape.setMargin( margin );

            				//pos = new THREE.Vector3(10,0,10);
            				if (!origin){
            					pos.x = j + 20;
            					pos.y = (4-cycle)*10;//Math.random()* 200 - 100;
            					pos.z = camera.position.z;//Math.random()* 100;// - 100;
            				}else{
            					pos.copy( origin );
            					pos.x = (j + 20) -20;
            				}
            				//pos.copy( raycaster.ray.direction );
            				//pos.add( raycaster.ray.origin );
            				quat.set( 0, 0, 0, 1 );
            				var letterBody = createRigidBody( letter, letterShape, letterMass, pos, quat );
            				//var letterBody = createRigidBody( letter, letterShape, letterMass, pos, quat );
            				letterBody.setFriction( 0.9 );

            				var direction = new THREE.Vector3();
             				direction.subVectors( new THREE.Vector3(0,0,0), pos ).normalize() ;

             				//pos.copy( raycaster.ray.direction );
             				

            				pos.copy( direction );
            				//pos.multiplyScalar( 5+ (cycle*10) );
            				pos.multiplyScalar(speed)
            				letterBody.setLinearVelocity( new Ammo.btVector3( pos.x, pos.y, pos.z ) );

            				*/
        }
    }

    function initInput() {

        document.addEventListener('keypress', onDocumentKeyPress, false);

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );

      	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );



    }

     function onDocumentMouseDown( event ) {

        event.preventDefault();

        addWords();
        rotateActive = true;

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownY = targetRotationY;

        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownX = targetRotationX;

    }

    function onDocumentMouseMove( event ) {

    	if (rotateActive){

	        mouseX = event.clientX - windowHalfX;
	        mouseY = event.clientY - windowHalfY;

	        targetRotationY = targetRotationOnMouseDownY + ( mouseX - mouseXOnMouseDown ) * 0.02;
	        targetRotationX = targetRotationOnMouseDownX + ( mouseY - mouseYOnMouseDown ) * 0.02;
	      //  console.log(targetRotation)
	  }
    }

    function onDocumentMouseUp( event ) {

        rotateActive = false;
        targetRotationY = 0;
        targetRotationOnMouseDownY = 0;

    }
/*
    function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

    }
*/
    function onDocumentTouchStart( event ) {

        if ( event.touches.length == 1 ) {

            event.preventDefault();

            mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
            targetRotationOnMouseDownY = targetRotationY;

            mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
            targetRotationOnMouseDownX = targetRotationX;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

            mouseY = event.touches[ 0 ].pageY - windowHalfY;
            targetRotationX = targetRotationOnMouseDownX + ( mouseY - mouseYOnMouseDown ) * 0.05;

        }

    }

    function onDocumentKeyDown(event) {



        var keyCode = event.keyCode;

        console.log(keycode)
            /*
                        // backspace

                        if ( keyCode == 8 ) {

                            event.preventDefault();

                            text = text.substring( 0, text.length - 1 );
                            refreshText();

                            return false;

                        }
            */
    }

    function onDocumentKeyPress(event) {
        resetTimer();

        var keyCode = event.which;
        console.log(keyCode)

        // enter
        if (keyCode == 13) {

            baseline = -10;
            if (vert < 0) {
                vert = 20;
            } else {
                vert -= 20;
            }

            clearTimeout(t);

        }
        // backspace
        else if (keyCode == 8) {

            event.preventDefault();

        } else {

            var ch = String.fromCharCode(keyCode);
            text = ch;
          //  console.log('text is ' + text)

            // refreshText();
            //   createLetter(ch, 1);
            createText(text, 5)

        }

    }



    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        requestAnimationFrame(animate);

        if (renderActive) render();
        //stats.update();

    }

    function render() {

        var deltaTime = clock.getDelta();

        if (rotateActive){
            scene.rotation.y -= ( targetRotationY - scene.rotation.y ) * 0.0025;
	    }else{
	    	scene.rotation.y += ( 0 - scene.rotation.y ) * 0.005;
	    	//console.log(scene.rotation.y)
	    }
      //  scene.rotation.x += ( targetRotationX - scene.rotation.x ) * 0.005;

       // console.log(group.rotation)

        updatePhysics(deltaTime);

        cleanupOldies();

      //  controls.update(deltaTime);

        //renderer.render( scene, camera );

        if (postprocessing.enabled) {

            renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);
            composer.render(deltaTime);

        } else {

            renderer.render(scene, camera);

        }

        time += deltaTime;

    }

    function updatePhysics(deltaTime) {

        // Step world
        physicsWorld.stepSimulation(deltaTime, 10);

        // Update rigid bodies
        for (var i = 0, il = rigidBodies.length; i < il; i++) {
            var objThree = rigidBodies[i];
            var objPhys = objThree.userData.physicsBody;
            var ms = objPhys.getMotionState();
            if (ms) {

                ms.getWorldTransform(transformAux1);
                var p = transformAux1.getOrigin();
                var q = transformAux1.getRotation();
                objThree.position.set(p.x(), p.y(), p.z());
                objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());

                objThree.userData.collided = false;

            }
        }

        for (var i = 0, il = dispatcher.getNumManifolds(); i < il; i++) {

            var contactManifold = dispatcher.getManifoldByIndexInternal(i);
            var rb0 = contactManifold.getBody0();
            var rb1 = contactManifold.getBody1();

            var threeObject0 = Ammo.castObject(rb0.getUserPointer(), Ammo.btVector3).threeObject;
            var threeObject1 = Ammo.castObject(rb1.getUserPointer(), Ammo.btVector3).threeObject;

            if (!threeObject0 && !threeObject1) {
                continue;
            }

            var userData0 = threeObject0 ? threeObject0.userData : null;
            var userData1 = threeObject1 ? threeObject1.userData : null;

            var breakable0 = userData0 ? userData0.breakable : false;
            var breakable1 = userData1 ? userData1.breakable : false;

            var collided0 = userData0 ? userData0.collided : false;
            var collided1 = userData1 ? userData1.collided : false;

            if ((!breakable0 && !breakable1) || (collided0 && collided1)) {
                continue;
            }

            var contact = false;
            var maxImpulse = 0;
            for (var j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) {
                var contactPoint = contactManifold.getContactPoint(j);
                if (contactPoint.getDistance() < 0) {
                    contact = true;
                    var impulse = contactPoint.getAppliedImpulse();
                    if (impulse > maxImpulse) {
                        maxImpulse = impulse;
                        var pos = contactPoint.get_m_positionWorldOnB();
                        var normal = contactPoint.get_m_normalWorldOnB();
                        impactPoint.set(pos.x(), pos.y(), pos.z());
                        impactNormal.set(normal.x(), normal.y(), normal.z());
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



    function staticEffect() {
        var renderPass = new THREE.RenderPass(scene, camera);
        var effectFilm = new THREE.FilmPass(0.8, 0.325, 1400, false);
        effectFilm.renderToScreen = true;

        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(effectFilm);

        /*
            var colorifyPass = new THREE.ShaderPass( THREE.ColorifyShader );
			colorifyPass.uniforms[ "color" ].value = new THREE.Color( 0xffff32 );
			colorifyPass.renderToScreen = true;
			composer.addPass( colorifyPass );
		*/
/*
        // setup the control gui
        var controls = new function() {
            this.scanlinesCount = 800;
            this.grayscale = false;
            this.cleanup = false;
            this.render = true;
            this.helpers = showHelpers;
            this.scanlinesIntensity = 0.1;
            this.noiseIntensity = 0.4; //8;

            this.updateEffectFilm = function() {
                effectFilm.uniforms.grayscale.value = controls.grayscale;
                effectFilm.uniforms.nIntensity.value = controls.noiseIntensity;
                effectFilm.uniforms.sIntensity.value = controls.scanlinesIntensity;
                effectFilm.uniforms.sCount.value = controls.scanlinesCount;
            };

            this.updateHelpers = function(value) {
                //alert('updateHelpers');
                console.log(value)
                for (var n = 0; n < letterArr.length; n++) {
                    var char = letterArr[n];
                    //char.visible = value;
                    char.getObjectByName("wire").visible = value;
                    char.getObjectByName("volume").visible = value;
                    showHelpers = value;

                }
            };

            this.updateRender = function(value) {
                //alert('updateHelpers');
                 renderActive = value;
            };
        };


        var gui = new dat.GUI();
        gui.add(controls, "scanlinesIntensity", 0, 1).onChange(controls.updateEffectFilm);
        gui.add(controls, "noiseIntensity", 0, 3).onChange(controls.updateEffectFilm);
        gui.add(controls, "grayscale").onChange(controls.updateEffectFilm);
        gui.add(controls, "helpers").onChange(controls.updateHelpers);
        gui.add(controls, "cleanup").onChange(cleanupPhysics);
        gui.add(controls, "render").onChange(controls.updateRender);

        gui.add(controls, "scanlinesCount", 0, 2048).step(1).onChange(controls.updateEffectFilm);
      */
    }
