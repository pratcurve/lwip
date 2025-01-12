var join = require('path').join,
    should = require('should'),
    assert = require('assert'),
    mkdirp = require('mkdirp'),
    lwip = require('../../'),
    imgs = require('../imgs');

var tmpDir = join(__dirname, '../results'),
    basename = 'border',
    current = [basename];

describe('lwip.border', function() {

    var image;

    before(function(done) {
        mkdirp(tmpDir, done);
    });

    beforeEach(function(done) {
        lwip.open(imgs.png.rgb, function(err, img) {
            image = img;
            done(err);
        });
    });

    afterEach(function(done) {
        image.writeFile(join(tmpDir, current.join('_') + '.png'), 'png', {
            compression: 'none'
        }, done);
    });

    describe('19 pixels, green', function() {
        var width = 500 + 19 * 2,
            height = 333 + 19 * 2;
        it('image should have the correct size', function(done) {
            current.push('19px_green');
            image.border(19, 'green', function(err, im) {
                if (err) return done(err);
                assert(im.width() === width);
                assert(im.height() === height);
                done();
            });
        });
    });

});
