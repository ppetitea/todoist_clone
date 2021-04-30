import colorSystem, {
  surfaces,
  colors,
  text,
  opacity,
} from "../constants/colorSystem";
import { ColorHSL, IColorHSL } from "../models/colors";

const buildTextPalette = () => {
  const { dark, light } = text.contrast;
  const { text1, text2, text3 } = text.priority;
  let textPalette = {
    dark: {
      text1: new ColorHSL(dark).apply(text1).get(),
      text2: new ColorHSL(dark).apply(text2).get(),
      text3: new ColorHSL(dark).apply(text3).get(),
    },
    light: {
      text1: new ColorHSL(light).apply(text1).get(),
      text2: new ColorHSL(light).apply(text2).get(),
      text3: new ColorHSL(light).apply(text3).get(),
    },
  };
  return textPalette;
};

const buildTextPaletteForColor = (color: IColorHSL | ColorHSL) => {
  const text = buildTextPalette();
  const colorHSL = new ColorHSL(color);
  if (colorHSL.isColorAccessibilityMatchWithDark()) {
    return text.dark;
  } else return text.light;
};

const buildColorPalette = (color: IColorHSL | ColorHSL) => {
  let colorPalette = {
    main: new ColorHSL(color).get(),
    light: new ColorHSL(color).lighter(12).get(),
    light1: new ColorHSL(color).lighter(5).get(),
    light2: new ColorHSL(color).lighter(10).get(),
    light3: new ColorHSL(color).lighter(15).get(),
    light4: new ColorHSL(color).lighter(20).get(),
    light5: new ColorHSL(color).lighter(30).get(),
    dark: new ColorHSL(color).darker(9).get(),
    dark1: new ColorHSL(color).darker(5).get(),
    dark2: new ColorHSL(color).darker(10).get(),
    dark3: new ColorHSL(color).darker(15).get(),
    dark4: new ColorHSL(color).darker(20).get(),
    dark5: new ColorHSL(color).darker(30).get(),
    background: new ColorHSL(color).setAlpha(0.08).get(),
    border: new ColorHSL(color).setAlpha(0.5).get(),
    ...buildTextPaletteForColor(color),
  };
  return colorPalette;
};

const buildDarkPalette = () => {
  const { dark } = text.contrast;
  const { text1, text2, text3 } = text.priority;
  let palette = {
    surface1: new ColorHSL(surfaces.dark1).get(),
    surface2: new ColorHSL(surfaces.dark2).get(),
    surface3: new ColorHSL(surfaces.dark3).get(),
    surface4: new ColorHSL(surfaces.dark4).get(),
    surface5: new ColorHSL(surfaces.dark5).get(),
    text1: new ColorHSL(dark).apply(text1).get(),
    text2: new ColorHSL(dark).apply(text2).get(),
    text3: new ColorHSL(dark).apply(text3).get(),
    border: new ColorHSL(dark).apply(opacity.border).get(),
    divider: new ColorHSL(dark).apply(opacity.divider).get(),
    hover: new ColorHSL(dark).apply(opacity.hover).get(),
    selected: new ColorHSL(dark).apply(opacity.selected).get(),
    disabled: new ColorHSL(dark).apply(opacity.disabled).get(),
    focus: new ColorHSL(dark).apply(opacity.focus).get(),
    shadow: new ColorHSL(dark).apply(opacity.shadow).get(),
    shadow1: new ColorHSL(dark).apply(opacity.shadow1).get(),
    shadow2: new ColorHSL(dark).apply(opacity.shadow2).get(),
    shadow3: new ColorHSL(dark).apply(opacity.shadow3).get(),
    shadow4: new ColorHSL(dark).apply(opacity.shadow4).get(),
    shadow5: new ColorHSL(dark).apply(opacity.shadow5).get(),
  };
  return palette;
};
const buildLightPalette = () => {
  const { light } = text.contrast;
  const { text1, text2, text3 } = text.priority;
  let palette = {
    surface1: new ColorHSL(surfaces.light1).get(),
    surface2: new ColorHSL(surfaces.light2).get(),
    surface3: new ColorHSL(surfaces.light3).get(),
    surface4: new ColorHSL(surfaces.light4).get(),
    surface5: new ColorHSL(surfaces.light5).get(),
    text1: new ColorHSL(light).apply(text1).get(),
    text2: new ColorHSL(light).apply(text2).get(),
    text3: new ColorHSL(light).apply(text3).get(),
    border: new ColorHSL(light).apply(opacity.border).get(),
    divider: new ColorHSL(light).apply(opacity.divider).get(),
    hover: new ColorHSL(light).apply(opacity.hover).get(),
    selected: new ColorHSL(light).apply(opacity.selected).get(),
    disabled: new ColorHSL(light).apply(opacity.disabled).get(),
    focus: new ColorHSL(light).apply(opacity.focus).get(),
    shadow: new ColorHSL(light).apply(opacity.shadow).get(),
    shadow1: new ColorHSL(light).apply(opacity.shadow1).get(),
    shadow2: new ColorHSL(light).apply(opacity.shadow2).get(),
    shadow3: new ColorHSL(light).apply(opacity.shadow3).get(),
    shadow4: new ColorHSL(light).apply(opacity.shadow4).get(),
    shadow5: new ColorHSL(light).apply(opacity.shadow5).get(),
  };
  return palette;
};

const colorSystemToPalette = () => {
  const palette = {
    dark: buildDarkPalette(),
    light: buildLightPalette(),
    primary: buildColorPalette(colors.primary),
    secondary: buildColorPalette(colors.secondary),
    info: buildColorPalette(colors.info),
    success: buildColorPalette(colors.success),
    error: buildColorPalette(colors.error),
    warning: buildColorPalette(colors.warning),
    action: buildColorPalette(colors.action),
  };
  console.log(JSON.stringify(palette, null, 2));
};

export default colorSystemToPalette;
