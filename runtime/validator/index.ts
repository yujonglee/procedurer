import { validateIdUniquness } from "./ids";

console.log([
    ...validateIdUniquness(),
].join("\n"));
