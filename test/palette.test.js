import Pigment, { Palette } from '../src/pigment';


describe('Palette instantiation', () => {
    test('it stores hex as upper case', () => {
        const palette = Palette(Pigment('#47FF66'));
        console.log(palette.toHexArray());
    });
});
