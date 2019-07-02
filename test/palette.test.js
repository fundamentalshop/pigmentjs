import Pigment, { Palette } from '../src/pigment';
import ColourPalette from '../src/colour-palette';


describe('Palette instantiation', () => {
    test('it accepts instances of Pigment', () => {
        const colour = Pigment('#47FF66');
        const palette = Palette(colour);
        expect(palette).toBeInstanceOf(ColourPalette);
    });

    test('it accepts a hex string', () => {
        const palette = Palette('#47FF66');
        expect(palette).toBeInstanceOf(ColourPalette);
    });

    test('it throws an error when provided with invalid parameter', () => {
        expect(() => Palette({})).toThrow();
    });
});

describe('Palette toHexArray', () => {
    test('it returns source colour and complementary colour', () => {
        const palette = Palette(Pigment('#47FF66'));
        expect(palette.toHexArray()).toEqual([
            Pigment('#47FF66').hex,
            Pigment('#47FF66').complementary().hex,
        ]);
    });
});
