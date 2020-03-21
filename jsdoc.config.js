"use strict";

module.exports = {
  source: {
    include: ["src", "README.md"],
    includePattern: ".js$",
    excludePattern: "(node_modules/|.test.js|.benchmark.js)",
  },
  opts: {
    destination: "docs",
    recurse: true,
  },
};
