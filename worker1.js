var n1 = 0;
var n2 = 1;
var nextTerm = 0;
var cnt = 0;
var t = Date.now();
var growArray = [];
var timer = null;

function growMemory() {
    try {
        growArray.push(new Uint8Array(1024 * 1024)); // 1Meg native arrays
        for (var i = 0; i < 1024 * 1024; i++) {
            growArray[growArray.length - 1][i] = i % 256;
        }
        var text = "Worker1 allocated " + growArray.length.toString() + " Mb of RAM";
        console.log(text);
        postMessage(text, []);
    } catch(e) {
        console.log("Worker1 growMemory() exception: " + e);
        postMessage("Worker1 growMemory() exception: " + e, []);
        clearInterval(timer);
        timer = null;
    }
}

onmessage = function (msg) {
    console.log('Worker1 received message:', msg.data);
    if (msg.data === '2') {
        if (timer !== null) {
            clearInterval(timer);
        }
        timer = setInterval(growMemory, 100);
        return;
    }
    t = Date.now();
    while (true) {
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        if (Date.now() > t + 1000) {
            break;
        }
        cnt += 1;
    }

    postMessage("Worker1 onmessage response, counter " + cnt + ' result ' + n1, []);
}

self.addEventListener("error", function (e) {
    console.log("Worker1 error: " + e);
    postMessage("Worker1 error: " + e, []);
    return false;
});
self.addEventListener('unhandledrejection', function (e) {
    console.log("Worker1 error: " + e);
    postMessage("Worker1 error: " + e, []);
});

try {
    postMessage("Worker1 self.isSecureContext: " + self.isSecureContext, []);
} catch(e) {}
