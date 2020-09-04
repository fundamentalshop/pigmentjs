import Pigment, {Palette} from '../src/index';
import {Pigment as p} from '../src/pigment';
import {Palette as pa} from '../src/palette';


describe('instantiation structure', () => {
    test('Pigment() will return an instance of Pigment', () => {
        expect(Pigment() instanceof p).toBeTrue();
    });

    test('Palette() will return an instance of Palette', () => {
        expect(Palette() instanceof pa).toBeTrue();
    });
});
