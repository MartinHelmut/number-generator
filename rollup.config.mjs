import babel from "@rollup/plugin-babel";
import clear from "rollup-plugin-clear";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

function createBundleConfig(input, output = {}) {
  const targetDir = "lib";
  const fileName = input.split("/").pop();

  return {
    input: `src/${input}.js`,
    output: Object.assign(
      {
        file: `${targetDir}/${fileName}.js`,
        format: "cjs",
        sourcemap: true,
        sourcemapFile: `${targetDir}/${fileName}.js.map`,
        exports: "auto",
      },
      output,
    ),
    plugins: [
      clear({ targets: [targetDir] }),
      resolve(),
      babel({ babelHelpers: "bundled" }),
      terser(),
      filesize({
        reporter: (_, __, { bundleSize, gzipSize }) =>
          `Bundle size: ${bundleSize}, Gzipped size: ${gzipSize}`,
      }),
      copy({
        targets: [
          {
            src: ["src/typings/*.d.ts"],
            dest: targetDir,
          },
        ],
      }),
    ],
  };
}

export default [
  createBundleConfig("index", {
    format: "umd",
    name: "numberGenerator",
  }),
  createBundleConfig("index", {
    format: "esm",
    file: "lib/index.esm.js",
    sourcemapFile: "lib/index.esm.js.map",
  }),
  createBundleConfig("fns/aleaRNGFactory"),
  createBundleConfig("fns/murmurhash2_x86_32"),
  createBundleConfig("fns/murmurhash3_x86_32"),
  createBundleConfig("fns/murmurhash3_x86_128"),
  createBundleConfig("fns/murmurhash3_x64_128"),
];
