import prand from "pure-rand";

// Seed is the sum of the ASCII decimal codes for the string "OSHW"
const seed = 79 + 83 + 72 + 87;
let rng = prand.xorshift128plus(seed);

// List of Hexidecimal Characters
const chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

/**
 * Returns a set of uniformly distributed integers between lBound and uBound, inclusive
 *
 * @param lBound inclusive lower bound of random selection
 * @param uBound inclusive upper bound of random selection
 * @param numInts number of uniformly distributed integers to return
 * @returns an empty array if lBound or uBound are not integers or numInts is less than 1, else returns an array of randomly selected integers
 */
export function uniformints(
  lBound: number,
  uBound: number,
  numInts: number
): number[] {
  let result: number[] = [];
  if (
    Number.isInteger(lBound) &&
    Number.isInteger(uBound) &&
    Number.isInteger(numInts) &&
    uBound > lBound &&
    numInts >= 1
  ) {
    for (let i = 0; i < numInts; i++) {
      result.push(prand.unsafeUniformIntDistribution(lBound, uBound, rng));
    }
  }

  return result;
}

/**
 * Reset RNG for generating ID's, by recalling constructor w/ library seed
 */
export function resetRNG() {
  rng = prand.xorshift128plus(seed);
}

/**
 * Returns a list of short ID's
 * 
 * @param numIDs number of short ID's to generate
 * @param numSkip a kind of starting index for short ID's
 * @returns a list of short ID's or empty array if numIDs is not an integer or less than one or numSkip is not an integer or less than 0
 */
export function generateIDs(numIDs: number, numSkip: number): string[] {
  // Reset RNG
  resetRNG();

  // Hardcoded ID length
  const idLen = 6;

  const lBound = 0;
  const uBound = 15;

  let result: string[] = [];

  if (
    Number.isInteger(numIDs) &&
    Number.isInteger(numSkip) &&
    numIDs > 0 &&
    numSkip >= 0
  ) {
    for (let i = 0; i < numSkip; i++) {
      uniformints(lBound, uBound, idLen);
    }

    for (let i = 0; i < numIDs; i++) {
      let indices = uniformints(lBound, uBound, idLen);
      let id = chars[indices[0]]+chars[indices[1]]+chars[indices[2]]+chars[indices[3]]+chars[indices[4]]+chars[indices[5]];
      result.push(id);
    }
  }

  return result;
}
