import prand from "pure-rand";

// Seed is the sum of the ASCII decimal codes for the string "OSHW"
const seed = 79 + 83 + 72 + 87;
let rng = prand.xorshift128plus(seed);

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
