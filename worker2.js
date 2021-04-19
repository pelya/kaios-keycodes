var n1 = 0;
var n2 = 1;
var nextTerm = 0;
var i = 0;
var t = Date.now();

while (true) {
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
    if (Date.now() > t + 14000) {
        t = Date.now();
        postMessage('Worker 2 counter ' + i + ' result ' + n1);
    }
    i += 1;
}

