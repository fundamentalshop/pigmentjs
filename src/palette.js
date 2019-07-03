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

    toHexArray() {
        return [this.primary.hex, this.complementary.hex];
    }
}

export default Palette;
