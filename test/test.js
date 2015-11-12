var assert = require('assert');
var debug = require('debug')('ocr-by-image-url:test');
var ocr = require('../index');

describe('ocr-by-image-url', function () {
    it('Get image by url and run ocr on it', function (done) {
        ocr.getImageText('https://raw.githubusercontent.com/frankred/node-ocr-by-image-url/master/test/resources/image1.jpg', null, function (error, text) {

            if (error) {
                throw error;
            }

            debug('detected text: ', text);
            done();
        });
    });
});