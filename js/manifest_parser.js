function manifestParser() {
  console.log("parse");
}

var manifestParser = function(url) {
  this.manifestUrl = url;
  this.manifestContent = null;
};

manifestParser.prototype.parse = function() {
  return new Promise(resolve => {
    var mpdParser = window['mpdParser'];
    var xhr = new XMLHttpRequest;
    xhr.open('GET', this.manifestUrl);
    xhr.responseType = 'text';
    xhr.overrideMimeType('text/xml');
    self = this;
    xhr.onload = function() {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        var parsedManifest = mpdParser.parse(xhr.responseText, {
          'manifestUri': self.manifestUrl
        });
        console.log("MPD: ", parsedManifest)
        self.manifestContent = parsedManifest;
        resolve(self.manifestContent);
      }
    };
    xhr.send();


  });
}
