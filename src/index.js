// These imports look weird. They're designed so that `palette instanceof Palette === true`;

import {Pigment as pi} from './pigment';
import {Palette as pa} from './palette';

export const Palette = (c) => new pa(c);
export const Pigment = (c) => new pi(c);
export default (c) => new pi(c);
