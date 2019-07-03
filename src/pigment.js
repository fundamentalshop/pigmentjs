export class Pigment {
    constructor(hex) {
        this.hex = hex || this._randomHex();

        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(this.hex)) {
            throw new Error('Invalid hex string');
        }

        if (this.hex.length === 7) {
            this.hex = this.hex.toUpperCase();
        } else if (this.hex.length === 4) {
            this.hex = `#${this.hex[1]}${this.hex[1]}${this.hex[2]}${this.hex[2]}${this.hex[3]}${this.hex[3]}`;
        }
    }

    get rgb() {
        const r = parseInt(this.hex.substring(1, 3), 16);
        const g = parseInt(this.hex.substring(3, 5), 16);
        const b = parseInt(this.hex.substring(5, 7), 16);
        return [r, g, b];
    }

    get rgbString() {
        const [r, g, b] = this.rgb;
        return `${r}, ${g}, ${b}`;
    }


    get hsl() {
        const [r, g, b] = this.rgb;
        return this._rgb2hsl(r, g, b);
    }

    get hue() {
        const [r, g, b] = this.rgb;
        const [h] = this._rgb2hsl(r, g, b);
        return h;
    }

    get saturation() {
        const [r, g, b] = this.rgb;
        const [h, s, l] = this._rgb2hsl(r, g, b);
        return s;
    }

    get lightness() {
        const [r, g, b] = this.rgb;
        const [h, s, l] = this._rgb2hsl(r, g, b);
        return l;
    }

    get hslString() {
        const [r, g, b] = this.rgb;
        const [h, s, l] = this._rgb2hsl(r, g, b);
        return `${h}, ${s}, ${l}`;
    }

    /**
     * Convert to HSL, rotate hue 180 degrees, convert
     * back to RGB and instantiate pigmentjs with hex
     *
     * @returns {Pigment} pigmentjs instance
     */
    complementary() {
        let h;
        let s;
        let l;

        // eslint-disable-next-line prefer-const
        [h, s, l] = this.hsl;

        h += 180;
        if (h > 360) {
            h -= 360;
        }

        const [r, g, b] = this._hsl2rgb(h, s, l);
        const hex = this._rgb2hex(r, g, b);
        return new Pigment(hex);
    }

    /**
     * Convert to HSL, rotate hue 120 degrees (twice), convert
     * back to RGB and instantiate pigmentjs with hex
     *
     * @returns [Pigment] 3x pigmentjs instances
     */
    triad() {
        let h;
        let s;
        let l;

        // eslint-disable-next-line prefer-const
        [h, s, l] = this.hsl;

        h += 120;
        if (h > 360) {
            h -= 360;
        }

        let [r, g, b] = this._hsl2rgb(h, s, l);
        let hex = this._rgb2hex(r, g, b);
        const Pigment2 = new Pigment(hex);

        h += 120;
        if (h > 360) {
            h -= 360;
        }

        [r, g, b] = this._hsl2rgb(h, s, l);
        hex = this._rgb2hex(r, g, b);
        const Pigment3 = new Pigment(hex);

        return [this, Pigment2, Pigment3];
    }

    monochrome(size = 5) {
        const satUnit = 100 / size;
        const saturations = [];

        for (let steps = size; steps > 0; steps -= 1) {
            saturations.push(steps * satUnit);
        }
        saturations.sort((a, b) => a - b);

        const Pigments = [];
        for (const sat of saturations) {
            // create new Pigment, same hue and lightness
            const [h, s, l] = this.hsl;
            const [r, g, b] = this._hsl2rgb(h, sat, l);
            Pigments.push(new Pigment(this._rgb2hex(r, g, b)));
        }

        return Pigments;
    }

    // --------------------PRIVATE FUNCTIONS---------------------------

    _randomHex() {
        let r = Math.round(Math.random() * (255)).toString(16);
        if (r.toString().length === 1)  {
            r += r;
        }

        let g = Math.round(Math.random() * (255)).toString(16);
        if (g.length === 1)  {
            g += g;
        }

        let b = Math.round(Math.random() * (255)).toString(16);
        if (b.length === 1) {
            b += b;
        }
        return `#${r}${g}${b}`.toUpperCase();
    }

    // https://medium.com/@donatbalipapp/Pigments-maths-90346fb5abda
    // http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
    // https://serennu.com/Pigment/hsltorgb.php
    _rgb2hsl(r, g, b) {
        let hue;
        let sat;
        let light;
        r /= 255;
        g /= 255;
        b /= 255;

        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);

        light = ((min + max) / 2);

        if (light < 100) {
            sat = (max - min) / (1 - Math.abs((2 * light) - 1)) * 100;
        } else {
            sat = 0;
        }

        switch (max) {
        case r:
            hue = ((g - b) / (max - min)) * 60;
            break;
        case g:
            hue = (2.0 + (b - r) / (max - min)) * 60;
            break;
        case b:
            hue = (4.0 + (r - g) / (max - min)) * 60;
            break;
        }

        if (hue < 0) {
            hue += 360;
        }

        hue = Math.round(hue * 10) / 10;
        sat = Math.round(sat * 10) / 10;
        light = Math.round((light * 100) * 10) / 10;

        return [hue || 0, sat || 0, light];
    }

    // https://www.rapidtables.com/convert/color/hsl-to-rgb.html
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
    _hsl2rgb(hue, sat, light) {
        sat /= 100;
        light /= 100;

        const chroma = (1 - Math.abs(2 * light - 1)) * sat;
        const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
        const m = light - chroma / 2;

        let r = 0;
        let g = 0;
        let b = 0;

        if (0 <= hue && hue < 60) {
            r = chroma; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
            r = x; g = chroma; b = 0;
        } else if (120 <= hue && hue < 180) {
            r = 0; g = chroma; b = x;
        } else if (180 <= hue && hue < 240) {
            r = 0; g = x; b = chroma;
        } else if (240 <= hue && hue < 300) {
            r = x; g = 0; b = chroma;
        } else if (300 <= hue && hue <= 360) {
            r = chroma; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return [r, g, b];
    }

    // https://css-tricks.com/converting-color-spaces-in-javascript/
    _rgb2hex(r, g, b) {
        r = Number(r).toString(16);
        g = Number(g).toString(16);
        b = Number(b).toString(16);

        if (r.length === 1) {
            r = `0${r}`;
        }
        if (g.length === 1) {
            g = `0${g}`;
        }
        if (b.length === 1) {
            b = `0${b}`;
        }

        return `#${r}${g}${b}`;
    }
}

export default Pigment;
