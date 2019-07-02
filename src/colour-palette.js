import Colour from './colour';


export default class ColourPalette {
    constructor(colour) {
        if (!(colour instanceof Colour)) {
            try {
                colour = new Colour(colour);
            } catch (e) {
                throw new Error('ColourPalette must be instantiated with either an instance of Pigment or a hex string');
            }
        }
        this.primary = colour;
        this.complementary = colour.complementary();
    }

    toHexArray() {
        return [this.primary.hex, this.complementary.hex];
    }
}
