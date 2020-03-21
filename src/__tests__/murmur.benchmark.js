const { Suite } = require("benchmark");

const murmurhash2_x86_32 = require("../../lib/murmurhash2_x86_32");
const murmurhash3_x86_32 = require("../../lib/murmurhash3_x86_32");
const murmurhash3_x86_128 = require("../../lib/murmurhash3_x86_128");
const murmurhash3_x64_128 = require("../../lib/murmurhash3_x64_128");

const suite = new Suite("murmur hash");

suite.add("murmurhash2_x86_32", () => {
  murmurhash2_x86_32("This is a decent length string with 🔌");
});

suite.add("murmurhash3_x86_32", () => {
  murmurhash3_x86_32("This is a decent length string with 🔌");
});

suite.add("murmurhash3_x86_128", () => {
  murmurhash3_x86_128("This is a decent length string with 🔌");
});

suite.add("murmurhash3_x64_128", () => {
  murmurhash3_x64_128("This is a decent length string with 🔌");
});

suite.on("complete", () => {
  console.log(`Fastest is: ${suite.filter("fastest").map("name")}\n`);
});

suite.on("cycle", (event) => {
  console.log(String(event.target));
});

console.log("Start benchmark test for murmur hash");
suite.run({ async: true });
