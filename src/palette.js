import Pigment from './pigment';


export class Palette {
    constructor(colour) {
        if (!(colour instanceof Pigment)) {
            try {
                colour = new Pigment(colour);
            } catch (e) {
                throw new Error('Palette must be instantiated with either an instance of Pigment or a hex string');
            }
        }
        this.primary = colour;
        this.complementary = colour.complementary();
    }

    monochromeHexArray(mode = 'shade') {
        const colours = [];
        colours.push(this.primary.monochrome(5, mode)[1]);
        colours.push(this.primary);
        colours.push(this.primary.monochrome(5, mode)[3]);
        colours.push(this.complementary.monochrome(5, mode)[1]);
        colours.push(this.complementary);
        colours.push(this.complementary.monochrome(5, mode)[3]);
        return colours.map(c => c.hex);
    }
}

export default Palette;
