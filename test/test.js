var assert = require('assert');
var debug = require('debug')('ocr-by-image-url:test');
var ocr = require('../index');

describe('ocr-by-image-url', function () {

    it('image0', function (done) {
        ocr.getImageText('https://raw.githubusercontent.com/frankred/node-ocr-by-image-url/master/test/resources/image0.png', null, function (error, text) {

            if (error) {
                throw error;
            }

            debug('detected text: ', text);
            assert.equal('Hello tesseract', text.trim());
            done();
        });
    });

    it('image1', function (done) {
        ocr.getImageText('https://raw.githubusercontent.com/frankred/node-ocr-by-image-url/master/test/resources/image1.jpg', null, function (error, text) {

            if (error) {
                throw error;
            }

            debug('detected text: ', text);
            assert.equal('LOREM IPSUM\nDOLOR SIT AMET!', text.trim());

            done();
        });
    });
});