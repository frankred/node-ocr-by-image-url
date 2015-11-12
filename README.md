# node-ocr-by-image-url
Node module based on ```node-tesseract``` to recognize texts in images by an image url.

## Install
```
npm install ocr-by-image-url
```

## Usage
```js
var ocr = require('ocr-by-image-url');

// OCR by image url
ocr.getImageText('http://image.com/cat.png', function(error, text){
    if(error){
        // Dammit...
        return;
    }

    console.log(text.trim);
});


// OCR by image url through proxy
var proxy = 'http://user:pass@proxy.server.com:3128';

ocr.getImageText('http://image.com/cat.png', proxy, function(error, text){
    if(error){
        // Dammit...
        return;
    }

    console.log(text.trim);
})
```
