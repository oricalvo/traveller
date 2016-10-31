"use strict";

function PromiseBuilder(stream) {
    this.end = this.begin = stream;
}

PromiseBuilder.prototype.pipe = function(pipe) {
    this.end = this.end.pipe(pipe);

    return this;
}

PromiseBuilder.prototype.get = function() {
    var me = this;

    return new Promise(function(resolve, reject) {
        //
        //  Must read the stream completely (flowing mode), else, no end event will occur
        //
        me.end.resume();

        me.end.on('end', function () {
            resolve();
        });

        me.end.on('error', function (err) {
            me.begin.end();

            reject(err);
        });
    });
}

function buildPromise(stream) {
    return new PromiseBuilder(stream);
}

module.exports = buildPromise;
