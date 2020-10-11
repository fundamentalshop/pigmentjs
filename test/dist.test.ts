const {Pigment} = require('../dist/pigment.js');


describe('loads', () => {
    test('public methods', () => {
        const pigment = Pigment();

        pigment.complementary();
        pigment.triad();
        pigment.monochrome();
        pigment.shades();
    });

    test('private methods', () => {
        const pigment = Pigment();

        pigment._randomHex();
        pigment._rgb();
        pigment._rgbString();
        pigment._hsl();
        pigment._hue();
        pigment._saturation();
        pigment._lightness();
        pigment._hslString();
        pigment._relativeLuminance();
        pigment._textColourHex();
    });
});
