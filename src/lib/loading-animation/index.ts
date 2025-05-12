import { LengthObject } from "../types";

/**
 * Creates a CSS animation for a loader with the specified name, frames, and suffix.
 *
 * @param loaderName - The name of the loader.
 * @param frames - The keyframes for the animation.
 * @param suffix - A suffix to append to the animation name.
 * @returns The name of the created animation.
 */
export const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`;

  if (typeof window == "undefined" || !window.document) {
    return animationName;
  }

  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  const styleSheet = styleEl.sheet;

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `;

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0);
  }

  return animationName;
};

/**
 * Creates a "SyncLoader" animation using the provided keyframes.
 *
 * The animation keyframes are defined as follows:
 * - 33%: Translates the element 40px down.
 * - 44%: Translates the element 50px down.
 * - 66%: Translates the element 20px down.
 * - 88%: Translates the element 10px down.
 * - 100%: Translates the element back to its original position.
 *
 * @constant
 * @type {Animation}
 * @param {string} name - The name of the animation.
 * @param {string} keyframes - The keyframes for the animation.
 * @param {string} type - The type of the animation.
 * @returns {Animation} The created animation.
 */
export const sync: string = createAnimation(
  "SyncLoader",
  `33% {transform: translateY(40px)} 
   44% {transform: translateY(50px)} 
   66% {transform: translateY(20px)} 
   88% {transform: translateY(10px)} 
   100% {transform: translateY(0)}`,
  "sync"
);

export const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  "%": true,
};

/**
 * Converts a numeric or string value to a valid CSS length value.
 *
 * @param value - The input value to be converted. Can be a number (interpreted as pixels) or a string (e.g., '10px', '2em').
 * @returns A string representing a valid CSS length value, including both the numeric value and its unit.
 */
export function cssValue(value: number | string): string {
  const lengthWithunit = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
}

/**
 * Parses a given size value into a length object containing a numeric value and a unit.
 *
 * @param size - The size to parse. Can be a number (interpreted as pixels) or a string (e.g., '10px', '2em').
 * @returns A LengthObject containing the parsed value and unit.
 *          If the input is a number, it's treated as pixels.
 *          If the input is a string, it attempts to extract the numeric value and unit.
 *          If the unit is not recognized, it defaults to pixels and logs a warning.
 */
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === "number") {
    return {
      value: size,
      unit: "px",
    };
  }
  let value: number;
  const valueString: string = (size.match(/^[0-9.]*/) || "").toString();
  if (valueString.includes(".")) {
    value = parseFloat(valueString);
  } else {
    value = parseInt(valueString, 10);
  }

  const unit: string = (size.match(/[^0-9]*$/) || "").toString();

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    };
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`
  );

  return {
    value,
    unit: "px",
  };
}
