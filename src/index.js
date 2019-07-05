// These imports look weird. They're designed so that `palette instanceof Palette === true`;

import Pigment from './pigment';
import {Palette as pa} from './palette';

export const Palette = (c) => new pa(c);
export default (c) => new Pigment(c);
