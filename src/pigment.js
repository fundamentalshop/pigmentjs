import Colour from './colour';
import ColourPalette from './colour-palette';

const Pigment = hex => new Colour(hex);
export const Palette = p => new ColourPalette(p);

export default Pigment;
