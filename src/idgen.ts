import prand from "pure-rand";

// Seed is the sum of the ASCII decimal codes for the string "OSHW"
let rng = prand.xorshift128plus(79 + 83 + 72 + 87);

export function uniformint(a: number, b: number) {
  return prand.unsafeUniformIntDistribution(a, b, rng);
}
