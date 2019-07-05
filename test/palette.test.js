import Pigment, { Palette } from '../src/index';


describe('Palette instantiation', () => {
    test('it returns source colour and complementary colour', () => {
        const colour = Pigment('#47FF66');
        const palette = Palette();
        expect(palette.primary).toEqual(colour);
        expect(palette.complementary).toEqual(colour.complementary());
    });
});
