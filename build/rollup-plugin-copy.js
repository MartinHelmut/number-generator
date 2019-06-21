/* eslint-disable compat/compat */
import chalk from "chalk";
import cpy from "cpy";

import { name } from "../package.json";

const copyFiles = params => {
  const { files, dest } = params;

  cpy(files, dest).catch(err => {
    throw new Error(`${chalk.red("Error copying")} ${files}  ->  ${dest}
${err}
`);
  });
};

export default function(options) {
  return {
    name,
    generateBundle() {
      if (Array.isArray(options)) {
        options.forEach(copyFiles);
      } else {
        copyFiles(options);
      }
    }
  };
}
