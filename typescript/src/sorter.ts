
function isNumber(value) {
  return !isNaN(value);
}

const splitOriginName = (originName) => {
  const match = originName.match(/(.*)[-/]([^-/]+)$/);
  return match ? { base: match[1], lastPart: match[2] } : { base: originName, lastPart: "" };
}

const SizesMap = {
  xsmall: 0,
  small: 1,
  medium: 2,
  default: 3,
  large: 4,
  xlarge: 5,
}

const LightnessMap = {
  lightest: 0,
  lighter: 1,
  light: 2,
  medium: 3,
  default: 4,
  dark: 5,
  darker: 6,
  darkest: 7,
}

  export const sortTokens = function (tokens) {
    const sortedValues = tokens.sort((a, b) => {
      
      if (!a.origin || !b.origin) {
        return a.name.localeCompare(b.name)
      }

      const splitA = splitOriginName(a.origin.name);
      const splitB = splitOriginName(b.origin.name);

      if (splitA.base !== splitB.base) {
        return splitA.base.localeCompare(splitB.base);
      }

      if (isNumber(splitA.lastPart) && isNumber(splitB.lastPart)) {
        const numberA = parseInt(splitA.lastPart, 10) || 0; // Default to 0 if no number
        const numberB = parseInt(splitB.lastPart, 10) || 0;
        return numberA - numberB;
      }

      if (splitA.lastPart && splitB.lastPart) {

        const sizePostfixA = SizesMap[splitA.lastPart.toLowerCase()]
        const sizePostfixB = SizesMap[splitB.lastPart.toLowerCase()]
    
        if (sizePostfixA != undefined && sizePostfixB != undefined) {
          return sizePostfixA - sizePostfixB
        }

        const lightnessPostfixA = LightnessMap[splitA.lastPart.toLowerCase()]
        const lightnessPostfixB = LightnessMap[splitB.lastPart.toLowerCase()]
    
        if (lightnessPostfixA != undefined && lightnessPostfixB != undefined) {
          return lightnessPostfixA - lightnessPostfixB
        }

        return splitA.lastPart.localeCompare(splitB.lastPart)
      }
      return 0
    });
    return sortedValues;
  };
