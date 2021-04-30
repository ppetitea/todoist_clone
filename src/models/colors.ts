export interface IColorHSL {
  h?: number;
  s?: number;
  l?: number;
  a?: number;
}

export class ColorHSL {
  h: number;
  s: number;
  l: number;
  a: null | number;
  constructor(initialState: undefined | IColorHSL | ColorHSL) {
    this.h = 0;
    this.s = 0;
    this.l = 0;
    this.a = null;
    if (initialState) this.apply(initialState);
  }
  apply(color: IColorHSL | ColorHSL) {
    if (color.h) this.h = color.h;
    if (color.s) this.s = color.s;
    if (color.l) this.l = color.l;
    if (color.a) this.a = color.a;
    return this;
  }
  setAlpha(alpha = 1) {
    this.a = alpha;
    return this;
  }
  hasAlpha() {
    return this.a !== null ? true : false;
  }
  getHSLA() {
    const { h, s, l, a } = this;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }
  getHSL() {
    const { h, s, l } = this;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  get() {
    return this.hasAlpha() ? this.getHSLA() : this.getHSL();
  }
  addLightnessVariation(variation: number) {
    let nextLightness = this.l + variation;
    if (nextLightness < 0) nextLightness = 0;
    if (nextLightness > 100) nextLightness = 100;
    this.l = nextLightness;
    return this;
  }
  lighter(n = 10) {
    return this.addLightnessVariation(n);
  }
  darker(n = 10) {
    return this.addLightnessVariation(-n);
  }
  isColorAccessibilityMatchWithDark() {
    return this.l > 60 ? true : false;
  }
  isColorAccessibilityMatchWithLight() {
    return !this.isColorAccessibilityMatchWithDark();
  }
}
