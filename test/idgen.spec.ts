import { uniformints, resetRNG } from "../src/idgen";
import { expect } from "chai";

describe("Test Uniform Ints", () => {
  it("should return an array, [5], if lBound == 1, uBound == 6, and numInts == 1", () => {
    resetRNG();
    const result = uniformints(1, 6, 1);
    expect(result.toString()).to.equal([5].toString());
  });
  it("should return an empty array if lBound is not an integer", () => {
    const result = uniformints(3.14, 5, 1);
    expect(result.length).to.equal(0);
  });
  it("should return an empty array if uBound is not an integer", () => {
    const result = uniformints(1, 3.14, 1);
    expect(result.length).to.equal(0);
  });
  it("should return an empty array if numInts is not an integer", () => {
    const result = uniformints(1, 3, 3.14);
    expect(result.length).to.equal(0);
  });
  it("should return an empty array if numInts is less than 1", () => {
    const result = uniformints(1, 3, 0);
    expect(result.length).to.equal(0);
  });
  it("should return an empty array if lBound and uBound are not integers", () => {
    const result = uniformints(3.14, 6.28, 1);
    expect(result.length).to.equal(0);
  });
  it("should return an empty array if uBound is less than lBound", () => {
    const result = uniformints(6, 3, 1);
    expect(result.length).to.equal(0);
  });
});
