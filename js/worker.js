self.onmessage = function (event) {
    const result = event.data * 2;
    postMessage(result);
}