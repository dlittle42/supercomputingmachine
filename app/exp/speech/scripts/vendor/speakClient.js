  var waveform,
      ctx,
      dancer,
      kick;

(function(window, undefined) {

  // Use the correct document accordingly with window argument
  var document = window.document;

  // Define a local copy of speak
  var speak = {};

  // Map over speak in case of overwrite
  var _speak = window.speak;

  // Runs speak.js in no conflict mode, returning the original 'speak'
  // variable to its owner. Returns a reference to this speak object.
  speak.noConflict = function() {
    window.speak = _speak;
    return speak;
  }

  var speakWorker;
  try {
    speakWorker = new Worker('scripts/vendor/speakWorker.js');
  } catch(e) {
    console.log('speak.js warning: no worker support');
  }

  speak.pause = function() {
    document.getElementById("player").pause();
  };

  speak.resume = function() {
    document.getElementById("player").play();
  };

  speak.play = function(text, args, onplay, onended) {
    var PROFILE = 1;

    function parseWav(wav) {
      function readInt(i, bytes) {
        var ret = 0;
        var shft = 0;
        while (bytes) {
          ret += wav[i] << shft;
          shft += 8;
          i++;
          bytes--;
        }
        return ret;
      }
      if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
      if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
      return {
        sampleRate: readInt(24, 4),
        bitsPerSample: readInt(34, 2),
        samples: wav.subarray(44)
      };
    }

    function playHTMLAudioElement(wav) {
      function encode64(data) {
        var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var PAD = '=';
        var ret = '';
        var leftchar = 0;
        var leftbits = 0;
        for (var i = 0; i < data.length; i++) {
          leftchar = (leftchar << 8) | data[i];
          leftbits += 8;
          while (leftbits >= 6) {
            var curr = (leftchar >> (leftbits-6)) & 0x3f;
            leftbits -= 6;
            ret += BASE[curr];
          }
        }
        if (leftbits == 2) {
          ret += BASE[(leftchar&3) << 4];
          ret += PAD + PAD;
        } else if (leftbits == 4) {
          ret += BASE[(leftchar&0xf) << 2];
          ret += PAD;
        }
        return ret;
      }

      document.getElementById("audio").innerHTML=("<audio id=\"player\" src=\"data:audio/x-wav;base64,"+encode64(wav)+"\">");
      if (onended) {
        document.getElementById("player").addEventListener('ended', onended);
      }
      if (onplay) {
        document.getElementById("player").addEventListener('play', onended);
      }
      document.getElementById("player").play();
      audio = document.getElementById("player");
      //document.querySelector('#myaudio').play();
/*

/// Works for pitchshifting say.js audio tag /////////
      var context = new webkitAudioContext(),
                gainNode = context.createGainNode(),
                buffer;

      var source = context.createMediaElementSource(audio);
      source.buffer = buffer;

      source.connect(context.destination);

      // Connect the source to the gain node.
      source.connect(gainNode);
      // Connect the gain node to the destination.
      gainNode.connect(context.destination);

      */


 /// Analyzes waveform say.js audio tag /////////
 /////Begin dancer.js ////////

waveform = document.getElementById( 'waveform' );
ctx = waveform.getContext( '2d' );


  /*
   * Dancer.js magic
   */
  Dancer.setOptions({
    flashSWF : '../dancer/lib/soundmanager2.swf',
    flashJS  : '../dancer/lib/soundmanager2.js'
  });

  dancer = new Dancer();

  kick = dancer.createKick({
    onKick: function () {
      ctx.strokeStyle = '#ff0077';
    },
    offKick: function () {
      ctx.strokeStyle = '#fff';
    }
  }).on();

  dancer
    .load( audio )
    .waveform( waveform, { strokeStyle: '#fff', strokeWidth: 1 });

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  /*
   * Loading
   */

  function loaded () {
    var
      loading = document.getElementById( 'loading' ),
      anchor  = document.createElement('A'),
      supported = Dancer.isSupported(),
      p;
/*
    anchor.appendChild( document.createTextNode( supported ? 'Playing!' : 'Close' ) );
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );
*/


    dancer.play();

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    anchor.addEventListener( 'click', function () {
      dancer.play();
      document.getElementById('loading').style.display = 'none';
    });
  }
 /////END dancer.js ////////

    }

    function playAudioDataAPI(data) {
      try {
        var output = new Audio();
        output.mozSetup(1, data.sampleRate);
        var num = data.samples.length;
        var buffer = data.samples;
        var f32Buffer = new Float32Array(num);
        for (var i = 0; i < num; i++) {
          var value = buffer[i<<1] + (buffer[(i<<1)+1]<<8);
          if (value >= 0x8000) value |= ~0x7FFF;
          f32Buffer[i] = value / 0x8000;
        }
        output.mozWriteAudio(f32Buffer);
        return true;
      } catch(e) {
        return false;
      }
    }

    function handleWav(wav) {
      var startTime = Date.now();
      var data = parseWav(wav); // validate the data and parse it
      // TODO: try playAudioDataAPI(data), and fallback if failed
      playHTMLAudioElement(wav);
      if (PROFILE) console.log('speak.js: wav processing took ' + (Date.now()-startTime).toFixed(2) + ' ms');
    }

    if (args && args.noWorker) {
      // Do everything right now. speakGenerator.js must have been loaded.
      var startTime = Date.now();
      var wav = generateSpeech(text, args);
      if (PROFILE) console.log('speak.js: processing took ' + (Date.now()-startTime).toFixed(2) + ' ms');
      handleWav(wav);
    } else {
      // Call the worker, which will return a wav that we then play
      var startTime = Date.now();
      speakWorker.onmessage = function(event) {
        if (PROFILE) console.log('speak.js: worker processing took ' + (Date.now()-startTime).toFixed(2) + ' ms');
        handleWav(event.data);
      };
      speakWorker.postMessage({ text: text, args: args });
    }
  };

  // Expose speak to the global object
  window.speak = speak;
})(window);
