import { assert } from "chai";

describe("number-generator", () => {
  describe("exports named function", () => {
    it("aleaRNGFactory", () => {
      const { aleaRNGFactory } = require("../index");
      assert.isFunction(aleaRNGFactory);
    });

    it("murmurhash2_x86_32", () => {
      const { murmurhash2_x86_32 } = require("../index");
      assert.isFunction(murmurhash2_x86_32);
    });

    it("murmurhash3_x86_32", () => {
      const { murmurhash3_x86_32 } = require("../index");
      assert.isFunction(murmurhash3_x86_32);
    });

    it("murmurhash3_x86_128", () => {
      const { murmurhash3_x86_128 } = require("../index");
      assert.isFunction(murmurhash3_x86_128);
    });

    it("murmurhash3_x64_128", () => {
      const { murmurhash3_x64_128 } = require("../index");
      assert.isFunction(murmurhash3_x64_128);
    });
  });
});
