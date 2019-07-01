export default class ColourPalette {
    constructor(colour) {
        // TODO if colour is not an instance of Colour, create one
        this.primary = colour;
        this.complementary = colour.complementary();
    }

    toHexArray() {
        return [this.primary.hex, this.complementary.hex];
    }
}
