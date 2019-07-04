## PigmentJS Documentation

### Quick Start

#### Install
`npm i --save pigmentjs`


#### Use Pigment
Instantiate PigmentJS to generate a random colour, or use a 3 or 6 character Hex string.
```javascript
import Pigment from 'pigmentjs'

Pigment(); // Random colour
Pigment('#FFFFFF');
Pigment('#F3C');
```

Create colours
```javascript
const pigment = Pigment('#22FF09');
const complementary = pigment.complementary().hex; // '#E609FF'
const triad = pigment.triad(); // [Pigment(), Pigment(), Pigment()]; 
```

#### Use Palette
```javascript
import Pigment, { Palette } from 'pigmentjs';

Palette(); // random colour
Palette('#22FF09');
Palette(Pigment('#22FF09'));
```

Create palettes
```javascript
const palette = Palette('#22FF09');

// NOTE: toHexArray() currently returns the input Hex and complementary Hex
palette.toHexArray(); // ['#22FF09', '#EF38E6'] 
```

## Pigment()

### API

#### Getters

`Pigment().rgb`

```javascript
Pigment().rgb; // [239, 56, 230]
```

`Pigment().rgbString`

```javascript
Pigment().rgbString; // '239, 56, 230'
```

`Pigment().hex`

```javascript
Pigment().hex; // '#EF38E6'
```

`Pigment().hsl`

```javascript
Pigment().hsl; // [302, 85.1, 57.8]
```

`Pigment().hslString`

```javascript
Pigment().hslString; // '302, 85.1, 57.8'
```

`Pigment().hue`

```javascript
Pigment().hue; // 302
```

`Pigment().saturation`

```javascript
Pigment().saturation; // 85.1
```

`Pigment().lightness`

```javascript
Pigment().lightness; // 57.8
```

#### Methods

Always returns a new Pigment instance or an array of Pigment instances.

---

`Pigment().complementary()`

Converts colour to HSL, rotates Hue by 180 degrees.

```javascript
Pigment().complementary(); // Pigment() (complementary colour)
```

---

`Pigment().triad()`

Converts colour to HSL, rotates Hue by 120 degrees either side.

```javascript
const pigment = Pigment();
pigment.triad(); // [colour, Pigment(), Pigment()]
```

---

`Pigment().monochrome(5)`

Returns an array of colours with a monochromatic relationship to the input colour.

Params

Size [Int] (required)

- How many new colours to return

Mode [String] (default 'saturation')

- 'saturation': Keep Hue the same, adjust saturation
- 'shade': Add black to colour
- 'tint': Add white to colour


```javascript
const pigment = Pigment();
pigment.monochrome(3); // [Pigment(), Pigment(), Pigment()]
```

---

## Palette()

### API

#### Methods

`Palette().toHexArray()`

Returns an array of Hex strings, currently just the input colour and its complementary colour.

```javascript
const palette = Palette('#22FF09');
palette.toHexArray(); // ['#22FF09', '#EF38E6'] 
```

---
