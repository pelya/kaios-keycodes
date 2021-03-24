
function logMsg(text) {
  console.log(text);
  var element = document.getElementById('output');
  if (element) {
    element.value = text + "\n" + element.value;
  }
}

function printKey(e) {
  if (!e.metaKey) {
    e.preventDefault();
  }

  // Check if Key_Values is Unidentified then redirect to docs
  let newKeyText = '';
  if (e.key != null && e.key === 'Unidentified') {
    newKeyText = 'Unidentified';
  } else if (e.key === ' ') {
    newKeyText = 'Space';
  } else {
    newKeyText = e.key || '';
  }

  // Check if code is Unidentified then redirect to docs
  let newCodeText = '';
  if (e.code != null && e.code === 'Unidentified') {
    newCodeText = 'Unidentified';
  } else {
    newCodeText = e.code || '';
  }

  let text = "event.keyCode=" + e.keyCode.toString() + " event.key=" + newKeyText + " event.code=" + newCodeText;

  logMsg(text);

  if (newKeyText === "EndCall") {
    window.open('', '_self').close();
  }
};

document.addEventListener('keydown', printKey);

var growArray = [];

function growMemory() {
  growArray.push(new Uint8Array(1024 * 1024)); // 1Meg native arrays
  for (var i = 0; i < 1024 * 1024; i++) {
    growArray[growArray.length - 1][i] = Math.floor(Math.random() * 256);
  }
  var text = "Allocated " + growArray.length.toString() + " Mb of RAM";
  logMsg(text);
}

//setInterval(growMemory, 200);

navigator.mozSetMessageHandler('activity', function(activityRequest) {
  var source = activityRequest.source;

  logMsg("Got activity request: " + String(activityRequest) + " option " + String(source) + " name " + source.name);

  if (source.name === "open") {
    logMsg("Open WAD");
  }
  if (source.name === "view") {
    logMsg("View WAD");
  }
  if (source.name === "share") {
    logMsg("Share WAD");
  }

  logMsg("Source properties:");
  for (var key of Object.keys(source)) {
    logMsg(key + " -> " + source[key]);
  }

  if ("url" in source) {
    logMsg("Source url: " + String(source.url));
  } else {
    logMsg("Source url empty");
  }

 try {
  if ("data" in source) {
    logMsg("Source data: ");
    for (var key of Object.keys(source.data)) {
      logMsg(key + " -> " + source.data[key]);
    }
    if ("blob" in source.data && "filename" in source.data) {
      logMsg("Source data blob: ");
      for (var key in source.data.blob) {
        logMsg(key);
      }
      logMsg("Filename: " + source.data.filename + " size " + source.data.blob.size);

      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
        const view = new Uint8Array(reader.result);
        const bin = [...view].map((n) => n.toString(16)).join(' ');
        logMsg(bin);
      });
      reader.readAsArrayBuffer(source.data.blob.slice(0, 20));
    }
  } else {
    logMsg("Source data empty");
  }
 } catch(e) {
    logMsg("Got exception: " + e);
 }


});

