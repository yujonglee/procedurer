import * as fs from "fs";
import * as path from "path"

const GENERATOR = "generator";
const VALIDATOR = "validator";

export const generateGeneratorIndex = (dest: string) => {
    const content = [
        `import { generateIdType } from "./ids";`,
        ``,
        `generateIdType();`,
        ''
    ].join("\n");

    const dir = path.join(dest, GENERATOR)
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.ts"), content);
}

export const generateIdTypeGenerator = (dest: string) => {
    const content = [
        `import * as fs from "fs";`,
        `import * as path from "path"`,
        ``,
        `import { ids } from "../data"`,
        ``,
        `export const generateIdType = () => {`,
        `  fs.writeFileSync(`,
        `    path.resolve(__dirname, "../types.ts"),`,
        `    \`export type ID = \${ids.map((id) => \`"\${id}"\`).join(" | ")};\``,
        `  );`,
        `}`,
        ``,
    ].join("\n");

    const dir = path.join(dest, GENERATOR);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "ids.ts"), content);
}

export const generateValidatorIndex = (dest: string) => {
    const content = [
        `import { validateIdUniquness } from "./ids";`,
        ``,
        `console.log([`,
        `    ...validateIdUniquness(),`,
        `].join("\\n"));`,
        ''
    ].join("\n");

    const dir = path.join(dest, VALIDATOR)
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.ts"), content);
}

export const generateIdUniqunessValidator = (dest: string) => {
    const content = [
        `import { ids } from "../data"`,
        `import { duplicatedId } from "../../src/compiler/error";`,
        '',
        `export const validateIdUniquness = () => {`,
        `  const set = new Set<string>();`,
        '',
        `  for (const id of ids) {`,
        `    if (set.has(id)) {`,
        `      return [duplicatedId(id)];`,
        `    }`,
        '',  
        `    set.add(id);`,
        `  }`,
        '',
        `  return [];`,
        `}`,
    ].join("\n");

    const dir = path.join(dest, VALIDATOR);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "ids.ts"), content);
}
