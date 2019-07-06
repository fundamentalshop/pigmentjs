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
    describe('Pigment().rgb', () => {
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

    describe('Pigment().rgbString', () => {
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

    describe('Pigment().hslString', () => {
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

    describe('Pigment().textColourHex', () => {
        test('#FFFFFF', () => {
            const colour = Pigment('#FFFFFF');
            expect(colour.textColourHex).toEqual('#000000');
        });

        test('#000000', () => {
            const colour = Pigment('#000000');
            expect(colour.textColourHex).toEqual('#FFFFFF');
        });

        test('#FF44CC', () => {
            const colour = Pigment('#FF44CC');
            expect(colour.textColourHex).toEqual('#FFFFFF');
        });

        test('#1B156B', () => {
            const colour = Pigment('#1B156B');
            expect(colour.textColourHex).toEqual('#FFFFFF');
        });

        test('#F4C542', () => {
            const colour = Pigment('#F4C542');
            expect(colour.textColourHex).toEqual('#000000');
        });
    });
});

describe('Pigment()._randomHex', () => {
    let colour;

    test('ensure always valid Hex', () => {
        for (let i = 0; i < 1000; i += 1) {
            colour = Pigment();
            expect(/^#[A-Fa-f0-9]{6}$/.test(colour.hex)).toEqual(true);
        }
    });
});

describe('Pigment().complementary()', () => {
    let pigment1;

    test('complementary rotates hue by 180 degrees', () => {
        for (let i = 0; i < 1000; i += 1) {
            pigment1 = Pigment();
            const hue1 = Math.round(pigment1.hue);
            const pigment2 = pigment1.complementary();
            const hue2 = Math.round(pigment2.hue);

            // anything at the centre of the colour wheel may retain its hue
            expect(Math.abs(hue2 - hue1)).toBeOneOf([180, 0]);
        }
    });

    test('complementary colour applied twice returns original hex', () => {
        for (let i = 0; i < 1000; i += 1) {
            const pigment = Pigment();
            const complementary = pigment.complementary();
            const original = complementary.complementary();

            expect(original.hex).toEqual(pigment.hex);
        }
    });

    describe('Specific colour checks', () => {
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
});

describe('Pigment().triad()', () => {
    let pigment;

    test('triad rotates hue by 120 degrees and returns three colours', () => {
        for (let i = 0; i < 1000; i += 1) {
            pigment = Pigment();
            const [colour1, colour2, colour3] = pigment.triad();
            const h1 = colour1.hue;
            const h2 = colour2.hue;
            const h3 = colour3.hue;

            const hue1 = Math.round(h1);
            const hue2 = Math.round(h2);
            const hue3 = Math.round(h3);

            const hues = [hue1, hue2, hue3];
            // anything at the centre of the colour wheel may retain its hue
            expect(Math.abs(hues[0] - hues[1])).toBeOneOf([120, 240, 0]);
            expect(Math.abs(hues[1] - hues[2])).toBeOneOf([120, 240, 0]);
        }
    });

});

describe('Pigment().monochrome()', () => {
    let pigment;

    test('Returns an array of Pigment() instances', () => {
        for (let i = 0; i < 1000; i += 1) {
            pigment = Pigment();
            const monochromeArray = pigment.monochrome(5);
            expect(monochromeArray.length).toEqual(5);
            for (const p of monochromeArray) {
                expect(p.constructor.name).toEqual('Pigment');
                expect(p.hex).toBeHexadecimal();
            }
        }
    });
});

describe('Pigment().shades()', () => {
    let pigment;

    test('Returns an array of Pigment() instances', () => {
        for (let i = 0; i < 1000; i += 1) {
            pigment = Pigment();
            const shadeArray = pigment.shades(5);
            expect(shadeArray.length).toEqual(5);
            for (const p of shadeArray) {
                expect(p.constructor.name).toEqual('Pigment');
                expect(p.hex).toBeHexadecimal();
            }
        }
    });
});

describe('Pigment().relativeLuminance', () => {
    let pigment;

    test('it returns a number between 0 and 1', () => {
        for (let i = 0; i < 1000; i += 1) {
            pigment = Pigment();
            expect(pigment.relativeLuminance).toBeLessThanOrEqual(1);
        }
    });
});
