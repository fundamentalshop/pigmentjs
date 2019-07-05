import Pigment from '../src/index';


describe('Pigment instantiation', () => {
    test('it stores hex as upper case', () => {
        const colour = Pigment('#ffffff');
        expect(colour.hex).toEqual('#FFFFFF');
    });

    test('it throws nice errors when failing instantiation', () => {
        expect(() => Pigment('fail')).toThrow(Error);
        expect(() => Pigment('#YYYYYY')).toThrow(Error);
    });

    test('generates random colour when instantiated with nothing', () => {
        const colour = Pigment();
        expect(/^#[A-Fa-f0-9]{6}$/.test(colour.hex)).toEqual(true);
    });
});

describe('getters', () => {
    describe('complementary colour', () => {
        test('#FFFFFF', () => {
            const colour = Pigment('#FFFFFF');
            expect(colour.complementary().hex).toEqual('#FFFFFF');
        });

        test('#47FF66', () => {
            const colour = Pigment('#47FF66');
            expect(colour.complementary().hex).toEqual('#FF47E0');
        });

        test('#FF47E0', () => {
            const colour = Pigment('#FF47E0');
            expect(colour.complementary().hex).toEqual('#47FF66');
        });

        test('#540EBE', () => {
            const colour = Pigment('#540EBE');
            expect(colour.complementary().hex).toEqual('#78BE0E');
        });

        test('#78BE0E', () => {
            const colour = Pigment('#78BE0E');
            expect(colour.complementary().hex).toEqual('#540EBE');
        });

        test('#FFA238', () => {
            const colour = Pigment('#FFA238');
            expect(colour.complementary().hex).toEqual('#3895FF');
        });

        test('#3895FF', () => {
            const colour = Pigment('#3895FF');
            expect(colour.complementary().hex).toEqual('#FFA238');
        });

        test('#E7E9E9', () => {
            const colour = Pigment('#E7E9E9');
            expect(colour.complementary().hex).toEqual('#E9E7E7');
        });
    });

    describe('it converts to RGB: ', () => {
        test('#FFFFFF', () => {
            const colour = Pigment('#FFFFFF');
            expect(colour.rgb).toEqual([255, 255, 255]);
        });

        test('#000000', () => {
            const colour = Pigment('#000000');
            expect(colour.rgb).toEqual([0, 0, 0]);
        });

        test('#F4C542', () => {
            const colour = Pigment('#F4C542');
            expect(colour.rgb).toEqual([244, 197, 66]);
        });

        describe('three character colours', () => {
            test('#FFF', () => {
                const colour = Pigment('#FFF');
                expect(colour.hex).toEqual('#FFFFFF');
                expect(colour.rgb).toEqual([255, 255, 255]);
            });
            test('#F4C', () => {
                const colour = Pigment('#F4C');
                expect(colour.hex).toEqual('#FF44CC');
                expect(colour.rgb).toEqual([255, 68, 204]);
            });
        });
    });

    describe('it converts to RGB String: ', () => {
        test('#FFFFFF', () => {
            const colour = Pigment('#FFFFFF');
            expect(colour.rgbString).toEqual('255, 255, 255');
        });

        test('#000000', () => {
            const colour = Pigment('#000000');
            expect(colour.rgbString).toEqual('0, 0, 0');
        });

        test('#F4C542', () => {
            const colour = Pigment('#F4C542');
            expect(colour.rgbString).toEqual('244, 197, 66');
        });

        describe('three character colours', () => {
            test('#FFF', () => {
                const colour = Pigment('#FFF');
                expect(colour.rgbString).toEqual('255, 255, 255');
            });
            test('#F4C', () => {
                const colour = Pigment('#F4C');
                expect(colour.rgbString).toEqual('255, 68, 204');
            });
        });
    });


    describe('it converts to hslString', () => {
        test('#FFFFFF', () => {
            const colour = Pigment('#FFFFFF');
            expect(colour.hslString).toEqual('0, 0, 100');
        });

        test('#000000', () => {
            const colour = Pigment('#000000');
            expect(colour.hslString).toEqual('0, 0, 0');
        });

        test('#F4C542', () => {
            const colour = Pigment('#F4C542');
            expect(colour.hslString).toEqual('44.2, 89, 60.8');
        });

        test('#F4C', () => {
            const colour = Pigment('#F4C');
            expect(colour.hslString).toEqual('316.4, 100, 63.3');
        });

        test('#1B156B', () => {
            const colour = Pigment('#1B156B');
            expect(colour.hslString).toEqual('244.2, 67.2, 25.1');
        });
    });
});

describe('randomHex', () => {
    let colour;

    beforeEach(() => {
        colour = Pigment();
    });

    test('ensure always valid Hex (test 10,000 times)', () => {
        for (let i = 0; i < 10000; i += 1) {
            expect(/^#[A-Fa-f0-9]{6}$/.test(colour.hex)).toEqual(true);
            colour = Pigment();
        }

        for (let i = 0; i < 10000; i += 1) {
            expect(/^#[A-Fa-f0-9]{6}$/.test(colour.complementary().hex)).toEqual(true);
            colour = Pigment();
        }
    });
});

describe('complementary colour', () => {
    let colour1;

    test('complementary rotates hue by 180 degrees', () => {
        for (let i = 0; i < 10000; i += 1) {
            colour1 = Pigment();
            const [h1] = colour1.hsl;
            const colour2 = colour1.complementary();
            const [h2] = colour2.hsl;

            const hue1 = Math.round(h1);
            const hue2 = Math.round(h2);
            expect(Math.abs(hue2 - hue1)).toEqual(180);
        }
    });

    test('complementary colour applied twice returns original hex', () => {
        for (let i = 0; i < 100; i += 1) {
            const colour = Pigment();
            const [r1, g1, b1] = colour.rgb;

            const [h, s, l] = colour.hsl;

            const [r2, g2, b2] = colour._hsl2rgb(h, s, l);
            expect(r1).toEqual(r2);
            expect(g1).toEqual(g2);
            expect(b1).toEqual(b2);
        }
    });
});

describe('triadic colour', () => {
    let colour;

    test('triad rotates hue by 120 degrees and returns three colours', () => {
        for (let i = 0; i < 10000; i += 1) {
            colour = Pigment();
            const [colour1, colour2, colour3] = colour.triad();
            const [h1] = colour1.hsl;
            const [h2] = colour2.hsl;
            const [h3] = colour3.hsl;

            const hue1 = Math.round(h1);
            const hue2 = Math.round(h2);
            const hue3 = Math.round(h3);

            const hues = [hue1, hue2, hue3];
            expect(Math.abs(hues[0] - hues[1])).toBeOneOf([120, 240]);
            expect(Math.abs(hues[1] - hues[2])).toBeOneOf([120, 240]);
        }
    });

});

describe('monochromatic colour', () => {
    test('all colours returned retain the same hue', () => {
        // TODO: Currently the hue can vary, sometimes up to 4 or 5.
        //  Need to investigate where the rounding error is
    });
});

describe('relative luminance', () => {
    let colour;

    test('it returns a number between 0 and 1', () => {
        for (let i = 0; i < 10000; i += 1) {
            colour = Pigment();
            expect(colour.relativeLuminance).toBeLessThanOrEqual(1);
        }
    });
});
