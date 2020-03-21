const { Suite } = require("benchmark");

const aleaRNGFactory = require("../../lib/aleaRNGFactory");

const suite = new Suite("murmurhash");

const generator1 = aleaRNGFactory();
suite.add("aleaRNGFactory#uInt32()", () => {
  generator1.uInt32();
});

const generator2 = aleaRNGFactory();
suite.add("aleaRNGFactory#uFloat32()", () => {
  generator2.uFloat32();
});

suite.on("complete", () => {
  console.log(`Fastest is: ${suite.filter("fastest").map("name")}\n`);
});

suite.on("cycle", (event) => {
  console.log(String(event.target));
});

console.log("Start benchmark test for aleaRNGFactory");
suite.run({ async: true });
