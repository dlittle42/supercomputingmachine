var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

 var colors = [
            "aliceblue",
            "antiquewhite",
            "aqua",
            "aquamarine",
            "azure",
            "beige",
            "bisque",
            "black",
            "blanchedalmond",
            "blue",
            "blueviolet",
            "brown",
            "burlywood",
            "cadetblue",
            "chartreuse",
            "chocolate",
            "coral",
            "cornflowerblue",
            "cornsilk",
            "crimson",
            "cyan",
            "darkblue",
            "darkcyan",
            "darkgoldenrod",
            "darkgray",
            "darkgreen",
            "darkkhaki",
            "darkmagenta",
            "darkolivegreen",
            "darkorange",
            "darkorchid",
            "darkred",
            "darksalmon",
            "darkseagreen",
            "darkslateblue",
            "darkslategray",
            "darkturquoise",
            "darkviolet",
            "deeppink",
            "deepskyblue",
            "dimgray",
            "dodgerblue",
            "firebrick",
            "floralwhite",
            "forestgreen",
            "fuchsia",
            "gainsboro",
            "ghostwhite",
            "gold",
            "goldenrod",
            "gray",
            "green",
            "greenyellow",
            "honeydew",
            "hotpink",
            "indianred",
            "indigo",
            "ivory",
            "khaki",
            "lavender",
            "lavenderblush",
            "lawngreen",
            "lemonchiffon",
            "lightblue",
            "lightcoral",
            "lightcyan",
            "lightgoldenrodyellow",
            "lightgray",            // IE6 breaks on this color
            "lightgreen",
            "lightpink",
            "lightsalmon",
            "lightseagreen",
            "lightskyblue",
            "lightslategray",
            "lightsteelblue",
            "lightyellow",
            "lime",
            "limegreen",
            "linen",
            "magenta",
            "maroon",
            "mediumaquamarine",
            "mediumblue",
            "mediumorchid",
            "mediumpurple",
            "mediumseagreen",
            "mediumslateblue",
            "mediumspringgreen",
            "mediumturquoise",
            "mediumvioletred",
            "midnightblue",
            "mintcream",
            "mistyrose",
            "moccasin",
            "navajowhite",
            "navy",
            "oldlace",
            "olive",
            "olivedrab",
            "orange",
            "orangered",
            "orchid",
            "palegoldenrod",
            "palegreen",
            "paleturquoise",
            "palevioletred",
            "papayawhip",
            "peachpuff",
            "peru",
            "pink",
            "plum",
            "powderblue",
            "purple",
            "red",
            "rosybrown",
            "royalblue",
            "saddlebrown",
            "salmon",
            "sandybrown",
            "seagreen",
            "seashell",
            "sienna",
            "silver",
            "skyblue",
            "slateblue",
            "slategray",
            "snow",
            "springgreen",
            "steelblue",
            "tan",
            "teal",
            "thistle",
            "tomato",
            "turquoise",
            "violet",
            "wheat",
            "white",
            "whitesmoke",
            "yellow",
            "yellowgreen"
        ];
/*
for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 6;

updateCountry();
select_dialect.selectedIndex = 6;
*/
showInfo('info_start');

speakMsg("Let's talk about colors.");
/*
function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  //console.log(list);
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}
*/
var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;//true;

  startButton();

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
   // $('#headline').text('OK, speak now.');
    $('#headline').fadeOut('slow', function() {
    // Animation complete.
    var msg = 'OK, speak now.';
    $(this).text(msg).fadeIn('slow');
    speakMsg(msg);
      
  });
    start_img.src = 'images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'images/mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'images/mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'images/mic.gif';
    if (!final_transcript) {
      showInfo('info_again');
      return;
    }
    showInfo('');

  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        setResponse(event.results[i][0].transcript)
        
      } else {
        interim_transcript += event.results[i][0].transcript;

      }
    }

  };
}

var whatArr = ['Huh?','Sorry?','What?','Come again?'];

function setResponse(txt){

   if(colors.indexOf(removeSpaces(txt.toLowerCase()))!= -1){
      $('#bkgd').css('background-color', removeSpaces(txt.toLowerCase()));
      ctx.strokeStyle = removeSpaces(txt.toLowerCase());
      $("#headline").text(txt.toLowerCase());
      speakMsg(txt);
   }else{
    var msg = whatArr[Math.floor(Math.random()*whatArr.length)]+' ' + txt+'?';
      $("#headline").text(msg);
      speakMsg(msg);
   }


        if (txt == 'left'){
            console.log('go left');
            camera.position.x = window.innerWidth/2 - 100;
        }else if (txt=='right'){
            console.log('go right');
             camera.position.x = window.innerWidth/2 +100;
        }

}

function removeSpaces(string) {
 return string.split(' ').join('');
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

function startButton() {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'United States';//select_dialect.value;
  console.log(recognition.lang);
  recognition.start();
  ignore_onend = false;
  //final_span.innerHTML = '';
  //interim_span.innerHTML = '';
  start_img.src = 'images/mic-slash.gif';
  showInfo('info_allow');
 // showButtons('none');
  start_timestamp = new Date().getTime();//event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}


$('#headline').delay(4000).fadeOut('slow', function() {
    // Animation complete.
    var msg = 'First, allow access to your microphone above.';
    $(this).text(msg).fadeIn('slow');
    speakMsg(msg);
  });

function speakMsg(msg){



  speak.play(
            msg, 
            { pitch: 100, speed:150  }, 
            function(){
                console.log('play!');
                //audio1.play();
            }, 
            function(){
                console.log('completed!');
               // audio1.play();
           }); 
}


////////////// 3D stuff ////////////////////////////////////////////

// the main three.js components
            var camera, scene, renderer,

            // to keep track of the mouse position
                mouseX = 0, mouseY = 0,

            // an array to store our particles in
                particles = [];

            // let's get going! 
            init();

            function init() {

                // Camera params : 
                // field of view, aspect ratio for render output, near and far clipping plane. 
                camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000 );

                // move the camera backwards so we can see stuff! 
                // default position is 0,0,0. 
                camera.position.z = 1000;

                // the scene contains all the 3D object data
                scene = new THREE.Scene();

                // camera needs to go in the scene 
                scene.add(camera);

                // and the CanvasRenderer figures out what the 
                // stuff in the scene looks like and draws it!

                renderer = new THREE.CanvasRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );

                // the renderer's canvas domElement is added to the body
                canvas = document.body.appendChild( renderer.domElement );
                canvas.id="three-d-canvas";

                makeParticles(); 

                // add the mouse move listener
                document.addEventListener( 'mousemove', onMouseMove, false );

                // render 30 times a second (should also look 
                // at requestAnimationFrame) 
                setInterval(update,1000/30); 

            }

            // the main update function, called 30 times a second

            function update() {

                updateParticles();

                // and render the scene from the perspective of the camera
                renderer.render( scene, camera );

            }

            // creates a random field of Particle objects

            function makeParticles() { 

                var particle, material; 

                // we're gonna move from z position -1000 (far away) 
                // to 1000 (where the camera is) and add a random particle at every pos. 
                for ( var zpos= -1000; zpos < 1000; zpos+=20 ) {

                    // we make a particle material and pass through the 
                    // colour and custom particle render function we defined. 
                    var randomColor = colors[Math.floor(Math.random() * colors.length)];

                    material = new THREE.ParticleCanvasMaterial( { color: randomColor, program: particleRender } );
                    // make the particle
                    particle = new THREE.Particle(material);

                    // give it a random x and y position between -500 and 500
                    particle.position.x = Math.random() * 1000 - 500;
                    particle.position.y = Math.random() * 1000 - 500;

                    // set its z position
                    particle.position.z = zpos;

                    // scale it up a bit
                    particle.scale.x = particle.scale.y = 10;

                    // add it to the scene
                    scene.add( particle );

                    // and to the array of particles. 
                    particles.push(particle); 
                }

            }

            // there isn't a built in circle particle renderer 
            // so we have to define our own. 

            function particleRender( context ) {

                // we get passed a reference to the canvas context
                context.beginPath();
                // and we just have to draw our shape at 0,0 - in this
                // case an arc from 0 to 2Pi radians or 360º - a full circle!
                context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
                context.fill();
            };


            // moves all the particles dependent on mouse position

            function updateParticles() { 

                // iterate through every particle
                for(var i=0; i<particles.length; i++) {

                    particle = particles[i]; 

                    // and move it forward dependent on the mouseY position. 
                    particle.position.z +=  (window.innerHeight- mouseY) * 0.1;
                    //particle.scale.x = particle.scale.y = Math.random()*10;
                    //camera.position.x = window.innerWidth/2 - mouseX;
                    // if the particle is too close move it to the back
                    if(particle.position.z>1000) particle.position.z-=2000; 

                }

            }

        // called when the mouse moves
            function onMouseMove( event ) {
                // store the mouseX and mouseY position 
                mouseX = event.clientX;
                mouseY = event.clientY;
            }