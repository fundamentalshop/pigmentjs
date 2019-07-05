# ![Logo](https://00e9e64bacc75fc9c440bca2def510eb31ed7e3dd4ca3456d7-apidata.googleusercontent.com/download/storage/v1/b/fundamental-assets/o/Pigment.png?qk=AD5uMEtj16CVrPIixDfLG-XaXsDQXxSONTM9Z4WrVBKW-oN48OPwP_WHEz1LuJXZEF_SfTZBeSVY5NS-Rzqjwd8k0paVUoomfO6a8xeil0E7vqBHWOoNOyOJl_SvNEDUkBjOoCZUGXpIPIAwoqRNBEEGdkz5Xpac0jWY5ecDZ-gO5IVwoTdMf6npkByP1t-jS5RAas4NSnVGtisU4W3W1GlKG0oo_t0EsnJLiUBf2v7dJ15cCzksfjBQeWBUKwqxDiuvJfRTa_TXNwAfY27gFQZ8Fb5g4Nz-6BYe8PDxMgyQrI67fWZl1QoddkZXcaYO6WMCs5O-XOIbdQiTGMG3kCz7IgknSZ94N0NnEq5IP07XeGiH1Mppayew12Adj2ZzMCVY9kiQOBfjBZnPZQKFhNAwitiZCHldCPbC6NZxoMY2UbqFfX9tPFg3z2eIiGUF1m8q7ypwtkCgS46fQ6yADPiwOno4fajmLxRHrhMLprwIpcsWQCFlHS2mvC_UgMaBuNWD-b2ihMwvufMEzGVVCbEinRjnpns76yA5TlZy8B24d58oKl43G9ELrl99l84iV2izzaauSVx1WzS6_dL4HPlCjmj6qb5haewBfKMPjPWMATomlbDeHmPfV0hnaBkB39eL5JxpMIcNUrm8hVQmtZsbYWCmx8Jxa9T8GWqyJs92T0ZMQ3nj9QGI3saAeHRUK1o9W6q209AUx5nph9FHKhTx_BvwXGJ6g7hIpfshHin8VhFrhsKJc0m2C9El1FQpZRtkWp80v6MajqT51lp3Grl5xqZL8qymyQ)  PigmentJS

### NOTE: PigmentJS is under development and subject to change wildly at any time. 

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

`Pigment().relativeLuminance`

```javascript
Pigment().relativeLuminance; // 0.56
```

`Pigment().textColourHex`

Returns black or white, whichever will have a higher contrast relative to the
primary colour.

```javascript
Pigment().textColourHex; // '#FFFFFF'
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
pigment.triad(); // [colour (itself), Pigment(), Pigment()]
```

---

`Pigment().monochrome(5)`

Returns an array of colours with a monochromatic relationship to the input colour.

Params

Size [Int] (required)

- How many new colours to return

Mode [String] (default 'saturation')

- 'saturation': Keep Hue the same, adjust saturation
- 'shade': Add % black to colour


```javascript
const pigment = Pigment();
pigment.monochrome(3); // [Pigment(), Pigment(), Pigment()]
```

---

### [Dev README](https://github.com/JamesToohey/pigmentjs/blob/master/docs/dev.md)
