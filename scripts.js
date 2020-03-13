
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

  console.log(text);
  var element = document.getElementById('output');
  if (element) {
    element.value = text + "\n" + element.value;
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
  var element = document.getElementById('output');
  if (element) {
    element.value = text + "\n" + element.value;
  }
}

setInterval(growMemory, 200);
