import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import clear from "rollup-plugin-clear";
import externalGlobals from "rollup-plugin-external-globals";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

function createTestConfig(input) {
  const targetDir = "compiled_tests";

  return {
    input: `src/fns/__tests__/${input}.test.js`,
    output: {
      file: `${targetDir}/${input}.test.js`,
      format: "iife",
      sourcemap: true,
      sourcemapFile: `compiled_tests/${input}.test.js.map`,
    },
    plugins: [
      clear({ targets: [targetDir] }),
      replace({
        [`requireFunction("${input}")`]: `numberGenerator.${input}`,
        'require("../../reference/cpp/results.json")': `(${JSON.stringify(
          require("./src/reference/cpp/results.json")
        )})`,
        delimiters: ["", ""],
      }),
      externalGlobals({
        chai: "chai",
      }),
      builtins(),
      resolve(),
      babel(),
      terser(),
    ],
  };
}

export default [
  createTestConfig("aleaRNGFactory"),
  createTestConfig("murmurhash2_x86_32"),
  createTestConfig("murmurhash3_x64_128"),
  createTestConfig("murmurhash3_x86_32"),
  createTestConfig("murmurhash3_x86_128"),
];
