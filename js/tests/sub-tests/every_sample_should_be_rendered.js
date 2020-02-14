const every_sample_shall_be_rendered = () => {

  var numberOfAppendedVideoSegment = 0;
  var t = {
    "playback_triggered": async_test("Video playback is triggered"),
    "gap_test": async_test("No gap in Buffer")
  };

  let onSourceBufferAdded = function(sourceBuffer) {
    const video = document.querySelector('video');
    if (sourceBuffer) {
      sourceBuffer.addEventListener('updateend', function() {
        const segmentsNumber = player.getCurrentManifest().playlists[0].segments.length;
        if (numberOfAppendedVideoSegment >= segmentsNumber) {
          console.log("ALL SEGMENT APPENDED")
          t.gap_test.step(function() {
            assert_equals(video.buffered.length, 1);
          });
          t.gap_test.done();
        }
        numberOfAppendedVideoSegment++;
      });
    }
  }

  video.addEventListener('loadstart', handleEvent);
  video.addEventListener('play', handleEvent);
  video.addEventListener('progress', handleEvent);
  video.addEventListener('canplay', handleEvent);
  video.addEventListener('canplaythrough', handleEvent);
  video.addEventListener('ended', handleEvent);
  const callbacks = [onSourceBufferAdded];
  player.registerCallbacks(callbacks);

  function handleEvent(event) {
    var video = document.querySelector('video');
    switch (event.type) {
      case "play":
        t.playback_triggered.step(function() {
          assert_true(true);
        });
        t.playback_triggered.done();
        break;
      default:
        console.log("video: ", event.type);
    }
  }
};
