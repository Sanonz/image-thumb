function thumb(options) {
    options = options || {};

    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = options.width * 2;
    canvas.height = options.height * 2;

    img.onload = function() {
        var sx = 0;
        var sy = 0;

        var sw = 0;
        var sh = 0;

        if( img.width < img.height ) {
            sw = img.width;
            sh = options.height * sw / options.width;

            sy = (img.height - sh) / 2;
        } else {
            sh = img.height;
            sw = options.width * sh / options.height;

            sx = (img.width - sw) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

        if( options.callback ) {
            options.callback({result: canvas.toDataURL()});
        }

        URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(options.file);
}


module.exports = thumb;
