var n1 = 0;
var n2 = 1;
var nextTerm = 0;
var i = 0;
var t = Date.now();

onmessage = function (msg) {
    console.log('Worker1 received message:', msg.data);
    t = Date.now();
    while (true) {
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        if (Date.now() > t + 2000) {
            break;
        }
        i += 1;
    }

    postMessage("Worker1 onmessage response, counter " + i + ' result ' + n1, []);
}
