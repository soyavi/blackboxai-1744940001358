export const hex2RgbA = (hex, opacity = 0.1) => {
  // This function converts a hexadecimal color value to an RGBA color value
  // The hex value is passed as the first argument and an opacity value (default is 0.1) can also be passed as the second argument
  // If the hex value is valid, it is converted to a decimal number and then to an RGBA color string
  // If the hex value is not valid, an error is thrown
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      ', ' +
      opacity +
      ')'
    );
  }
  throw new Error('Bad Hex');
};
