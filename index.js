var os = require('os');
var fs = require('fs');
var path = require('path');
var async = require('async');
var uuid = require('node-uuid');
var needle = require('needle');
var tesseract = require('node-tesseract');
var debug = require('debug')('ocr-by-image-url');

module.exports = {
    getImageText: function (url, proxy, callback) {

        if (typeof proxy === "function") {
            callback = proxy;
            proxy = null;
        }

        var wget = function (callback) {
            debug('http get image: ' + url);

            var options = {
                output: path.join(os.tmpdir(), 'node-ocr-by-image-url-' + uuid.v4() + '.png')
            };

            if (proxy) {
                options.proxy = proxy;
            }

            needle.get(url, options, function (error, response, body) {
                if (error) {
                    callback(error);
                    return;
                }

                debug('successfully downloaded to: ' + options.output);
                callback(null, options.output);
            });
        };

        var ocr = function (file, callback) {
            debug('tesseract process image ' + file);
            tesseract.process(file, function (error, text) {
                if (error) {
                    callback(error);
                    return;
                }

                debug('ocr result: ' + text);
                callback(null, file, text);
            });
        };

        var remove_file = function (file, text, callback) {
            debug('remove image ', file);
            fs.unlink(file, function (error) {
                if (error) {
                    debug('could not remove temp image for ocr detection', file);
                }

                callback(null, file, text);
            });
        };

        async.waterfall([wget, ocr, remove_file], function (error, file, text) {
            if (error) {
                callback(error);
                return;
            }
            callback(null, text);
        });
    }
};