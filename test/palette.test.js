import Pigment, { Palette } from '../src/index';


describe('Palette toHexArray', () => {
    test('it returns source colour and complementary colour', () => {
        const palette = Palette(Pigment('#47FF66'));
        for (const hexString of palette.monochromeHexArray()) {
            expect(hexString).toBeHexadecimal();
        }
    });
});
