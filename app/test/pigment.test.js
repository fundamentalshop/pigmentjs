import pigment from '../src/pigment';


describe('pigment instantiation', () => {
    test('it stores hex as upper case', () => {
        const colour = pigment('#ffffff');
        expect(colour.hex).toEqual('#FFFFFF');
    });

    test('it throws nice errors when failing instantiation', () => {
        expect(() => pigment('fail')).toThrow(Error);
        expect(() => pigment('#YYYYYY')).toThrow(Error);
    });

    test('generates random colour when instantiated with nothing', () => {
        const colour = pigment();
        expect(/^#[A-Fa-f0-9]{6}$/.test(colour.hex)).toEqual(true);
    });
});

describe('getters', () => {
    describe('complementary colour', () => {
        test('#FFFFFF', () => {
            const colour = pigment('#FFFFFF');
            expect(colour.complementary().hex).toEqual('#FFFFFF');
        });

        test('#47FF66', () => {
            const colour = pigment('#47FF66');
            expect(colour.complementary().hex).toEqual('#FF47E0');
        });

        test('#FF47E0', () => {
            const colour = pigment('#FF47E0');
            expect(colour.complementary().hex).toEqual('#47FF66');
        });

        test('#540EBE', () => {
            const colour = pigment('#540EBE');
            expect(colour.complementary().hex).toEqual('#78BE0E');
        });

        test('#78BE0E', () => {
            const colour = pigment('#78BE0E');
            expect(colour.complementary().hex).toEqual('#540EBE');
        });

        test('#FFA238', () => {
            const colour = pigment('#FFA238');
            expect(colour.complementary().hex).toEqual('#3895FF');
        });

        test('#3895FF', () => {
            const colour = pigment('#3895FF');
            expect(colour.complementary().hex).toEqual('#FFA238');
        });

        test('#E7E9E9', () => {
            const colour = pigment('#E7E9E9');
            expect(colour.complementary().hex).toEqual('#E9E7E7');
        });
    });

    describe('it converts to RGB: ', () => {
        test('#FFFFFF', () => {
            const colour = pigment('#FFFFFF');
            expect(colour.rgb).toEqual([255, 255, 255]);
        });

        test('#000000', () => {
            const colour = pigment('#000000');
            expect(colour.rgb).toEqual([0, 0, 0]);
        });

        test('#F4C542', () => {
            const colour = pigment('#F4C542');
            expect(colour.rgb).toEqual([244, 197, 66]);
        });

        describe('three character colours', () => {
            test('#FFF', () => {
                const colour = pigment('#FFF');
                expect(colour.hex).toEqual('#FFFFFF');
                expect(colour.rgb).toEqual([255, 255, 255]);
            });
            test('#F4C', () => {
                const colour = pigment('#F4C');
                expect(colour.hex).toEqual('#FF44CC');
                expect(colour.rgb).toEqual([255, 68, 204]);
            });
        });
    });

    describe('it converts to RGB String: ', () => {
        test('#FFFFFF', () => {
            const colour = pigment('#FFFFFF');
            expect(colour.rgbString).toEqual('255, 255, 255');
        });

        test('#000000', () => {
            const colour = pigment('#000000');
            expect(colour.rgbString).toEqual('0, 0, 0');
        });

        test('#F4C542', () => {
            const colour = pigment('#F4C542');
            expect(colour.rgbString).toEqual('244, 197, 66');
        });

        describe('three character colours', () => {
            test('#FFF', () => {
                const colour = pigment('#FFF');
                expect(colour.rgbString).toEqual('255, 255, 255');
            });
            test('#F4C', () => {
                const colour = pigment('#F4C');
                expect(colour.rgbString).toEqual('255, 68, 204');
            });
        });
    });


    describe('it converts to hslString', () => {
        test('#FFFFFF', () => {
            const colour = pigment('#FFFFFF');
            expect(colour.hslString).toEqual('0, 0, 100');
        });

        test('#000000', () => {
            const colour = pigment('#000000');
            expect(colour.hslString).toEqual('0, 0, 0');
        });

        test('#F4C542', () => {
            const colour = pigment('#F4C542');
            expect(colour.hslString).toEqual('44.2, 89, 60.8');
        });

        test('#F4C', () => {
            const colour = pigment('#F4C');
            expect(colour.hslString).toEqual('316.4, 100, 63.3');
        });

        test('#1B156B', () => {
            const colour = pigment('#1B156B');
            expect(colour.hslString).toEqual('244.2, 67.2, 25.1');
        })
    });
});

describe('randomHex', () => {
    let colour;

    beforeEach(() => {
        colour = pigment();
    });

    test('ensure always valid Hex (test 10,000 times)', () => {
        for (let i = 0; i < 10000; i++) {
            expect(/^#[A-Fa-f0-9]{6}$/.test(colour.hex)).toEqual(true);
            colour = pigment();
        }

        for (let i = 0; i < 10000; i++) {
            expect(/^#[A-Fa-f0-9]{6}$/.test(colour.complementary().hex)).toEqual(true);
            colour = pigment();
        }
    });
});

describe('complementary colour', () => {
    let colour1;

    beforeEach(() => {
        colour1 = pigment();
    });

    test('complementary rotates hue by 180 degrees', () => {
        for (let i = 0; i < 10000; i++) {
            const [h1] = colour1.hsl;
            const colour2 = colour1.complementary();
            const [h2] = colour2.hsl;

            const hue1 = Math.round(h1);
            const hue2 = Math.round(h2);
            expect(Math.abs(hue2 - hue1)).toEqual(180);
        }
    });

    test('complementary colour applied twice returns original hex', () => {
        for (let i = 0; i < 100; i++) {
            const colour = pigment();
            let r1, g1, b1;
            [r1, g1, b1] = colour.rgb;

            let h, s, l;
            [h, s, l] = colour.hsl;

            let r2, g2, b2;
            [r2, g2, b2] = colour._hsl2rgb(h, s, l);
            expect(r1).toEqual(r2);
            expect(g1).toEqual(g2);
            expect(b1).toEqual(b2);
        }
    });
});
