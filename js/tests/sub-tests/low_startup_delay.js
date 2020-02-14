const low_startup_delay = (max_delay) => {

  max_delay = max_delay ? max_delay : 120;
  var load_time = null;
  var t = {
    "low_startup": async_test("The start-up delay is sufficiently low (120ms max)")
  };
  video.addEventListener('play', handleEvent);
  let onManifestParsed = function() {
    load_time = new Date();
  }
  const callbacks = [onManifestParsed];
  player.registerCallbacks(callbacks);

  function handleEvent(event) {
    var video = document.querySelector('video');
    switch (event.type) {
      case "play":
        var playback_time = new Date();
        console.log("startup delay: ", playback_time - load_time)
        t.low_startup.step(function() {
          assert_true(playback_time - load_time < max_delay);
        });
        t.low_startup.done();
        break;
      default:
        console.log("video: ", event.type);
    }
  }
};
