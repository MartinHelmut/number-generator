import { Suite } from "benchmark";

import murmurhash2_x86_32 from "../fns/murmurhash2_x86_32";
import murmurhash3_x86_32 from "../fns/murmurhash3_x86_32";

const suite = new Suite("murmurhash");

suite.add("murmurhash2_x86_32", () => {
  murmurhash2_x86_32("This is a decent length string with 🔌");
});

suite.add("murmurhash3_x86_32", () => {
  murmurhash3_x86_32("This is a decent length string with 🔌");
});

suite.on("complete", () => {
  console.log(`Fastest is: ${suite.filter("fastest").map("name")}\n`);
});

suite.on("cycle", event => {
  console.log(String(event.target));
});

console.log("Start benchmark test for murmurhash");
suite.run({ async: true });
