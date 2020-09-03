const convertHexToRGB = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

export const getRGBAFromHex = (hex) => {
  const [r, g, b] = convertHexToRGB(hex);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
};
