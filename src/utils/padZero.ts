/**
 *
 * @param value Number value used for time
 * @returns Value as string with padded zero if applicable
 */
export const padZero = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};
