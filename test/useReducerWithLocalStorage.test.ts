import { useReducerWithLocalStorage } from "../src";

describe("useReducerWithLocalStorage", () => {
  it("test hook", () => {
    expect(useReducerWithLocalStorage<any, any>(() => {}, {}, "hi")).toBeInstanceOf(
      Array
    );
  });
});
