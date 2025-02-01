function getLuminance(r: any, g: any, b: any) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: any) {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
}

function rgbaToRgb(r: any, g: any, b: any, a: any, base = [255, 255, 255]) {
  return [
    Math.round((1 - a) * base[0] + a * r),
    Math.round((1 - a) * base[1] + a * g),
    Math.round((1 - a) * base[2] + a * b),
  ];
}

function parseColor(color: any) {
  let r, g, b, a;

  if (color.startsWith("#")) {
    [r, g, b] = hexToRgb(color);
    a = 1;
  } else if (color.startsWith("rgba")) {
    [r, g, b, a] = color.match(/\d+\.?\d*/g).map(Number);
  } else if (color.startsWith("rgb")) {
    [r, g, b] = color.match(/\d+/g).map(Number);
    a = 1;
  } else {
    throw new Error("Unsupported color format");
  }

  return { r, g, b, a };
}

export function setTextColorBasedOnBackground(color: any, setState: any) {
  const { r, g, b, a } = parseColor(color);
  const [blendedR, blendedG, blendedB] = rgbaToRgb(r, g, b, a);

  const luminance = getLuminance(blendedR, blendedG, blendedB);
  const textColor = luminance > 0.5 ? "black" : "white";
  setState(textColor);
  // textElement.style.color = textColor;
}
