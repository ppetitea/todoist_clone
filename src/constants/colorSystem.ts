const colorSystem = {
  surfaces: {
    dark1: { l: 12 },
    dark2: { l: 18 },
    dark3: { l: 21 },
    dark4: { l: 25 },
    dark5: { l: 29 },
    light1: { l: 92 },
    light2: { l: 94 },
    light3: { l: 96 },
    light4: { l: 98 },
    light5: { l: 100 },
  },
  text: {
    contrast: {
      dark: { l: 12 },
      light: { l: 100 },
    },
    priority: {
      text1: { a: 1 },
      text2: { a: 0.87 },
      text3: { a: 0.54 },
    },
  },
  opacity: {
    hover: { a: 0.04 },
    selected: { a: 0.08 },
    disabled: { a: 0.26 },
    focus: { a: 0.12 },
    border: { a: 0.23 },
    divider: { a: 0.12 },
    shadow: { a: 0.15 },
    shadow1: { a: 0.25 },
    shadow2: { a: 0.35 },
    shadow3: { a: 0.5 },
    shadow4: { a: 0.7 },
    shadow5: { a: 0.9 },
  },
  colors: {
    primary: { h: 5, s: 68, l: 55 },
    secondary: { h: 5, s: 68, l: 55 },
    info: { h: 207, s: 90, l: 54 },
    success: { h: 122, s: 39, l: 49 },
    error: { h: 4, s: 90, l: 58 },
    warning: { h: 36, s: 100, l: 50 },
    action: { l: 88 },
  },
};

export const { surfaces, colors, text, opacity } = colorSystem;
export default colorSystem;
