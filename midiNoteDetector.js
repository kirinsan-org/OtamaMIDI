angular.module('MidiNoteDetector', []).factory('MidiNoteDetector', function(audioContext, $interval) {
  var analyser = audioContext.createAnalyser();
  var data = new Float32Array(analyser.fftSize / 2);
  var promise;
  var maxValue = -9999;
  var maxIndex = -1;
  var freq, note;
  var prevFreq, prevNote;
  var playing;
  var noteOffThreshold = -80;
  var noteOnThreshold = -70;

  return {
    from: function(source) {
      source.connect(analyser);
      $interval.cancel(promise);
      promise = $interval(loop.bind(this), 10);
    },
    on: function(eventName, handler) {
      $(this).on(eventName, handler);
      return this;
    },
    off: function(eventName, handler) {
      $(this).off(eventName, handler);
      return this;
    }
  };

  function loop() {
    analyser.getFloatFrequencyData(data);

    maxValue = -9999;
    angular.forEach(data, setMax);
    // console.log(maxValue)
    if (playing && maxValue < noteOffThreshold) {
      $(this).trigger('noteOff');
      playing = false;
    } else if (!playing && maxValue >= noteOnThreshold) {
      $(this).trigger('noteOn');
      playing = true;
    }
    
    freq = audioContext.sampleRate * maxIndex / analyser.fftSize;
    rawNote = 12 * (Math.log(freq / 440) / Math.log(2)) + 69;
    note = Math.floor(rawNote);

    // notify changes
    if (playing) {
      if (freq !== prevFreq) {
        $(this).trigger('frequencyChange', [freq]);
      }

      if (note !== prevNote) {
        $(this).trigger('noteChange', [note, prevNote]);
      }
    }
    
    prevFreq = freq;
    prevNote = note;
  }

  function setMax(sample, idx) {
    if (maxValue < sample) {
      maxValue = sample;
      maxIndex = idx;
    }
  }
});