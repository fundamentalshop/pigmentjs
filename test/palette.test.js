import Pigment, { Palette } from '../src/index';


describe('Palette toHexArray', () => {
    test('it returns source colour and complementary colour', () => {
        const palette = Palette(Pigment('#47FF66'));
        expect(palette.toHexArray()).toEqual([
            Pigment('#47FF66').hex,
            Pigment('#47FF66').complementary().hex,
        ]);
    });
});
