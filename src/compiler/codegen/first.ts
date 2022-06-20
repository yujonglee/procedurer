import * as fs from "fs";
import * as path from "path"

import type { ExportsMap } from "../getExportsMap";

export const generateData = (dest: string, exportsMap: ExportsMap) => {
    const dir = dest;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
        path.join(dir, "data.ts"),
        [
            ...generateImports(exportsMap),
            ...generateIds(exportsMap),
            ...generateIdNameMap(exportsMap)
        ].join("\n")
    )
}

const generateImports = (exportsMap: ExportsMap) => {
    const imports = Object.keys(exportsMap).map((file) => {
        const { dir, name } = path.parse(file);

        return `import { id as ${name}Id } from "../${dir}/${name}"`;
    });

    return imports;
}

const generateIds = (exportsMap: ExportsMap) => {
    const ids = Object.keys(exportsMap).map((file) => {
        const { name } = path.parse(file);

        return `${name}Id`;
    });

    return [
        '',
        `export const ids = [${ids.join(", ")}];`,
        '',
    ]
}

const generateIdNameMap = (exportsMap: ExportsMap) => {
    const rows = Object.keys(exportsMap).map((file) => {
        const { name } = path.parse(file);

        return `  [${name}Id]: "${name}",`;
    });

    return [
        `export const idNameMap = {\n${rows.join("\n")}\n};`,
        '',
    ]
}

export const generateBuild = (dest: string, exportsMap: ExportsMap) => {
    const [startPath] = Object.entries(exportsMap).find(([_, namedExports]) => (
        !namedExports.includes("previous")
    ));

    const { name: startName } = path.parse(startPath);

    const importStatements = [`import { idNameMap } from "./data"`];
    const importIdentifiers: string[] = [];

    Object.keys(exportsMap).forEach((file) => {
        const { dir, name } = path.parse(file);

        if (name === startName) {
            importIdentifiers.push(`${name}Current`);
            importIdentifiers.push(`${name}Id`);

            importStatements.push(
                `import ${name}Current, { id as ${name}Id } from "../${dir}/${name}"`
            );

            return;
        }

        importIdentifiers.push(`${name}Current`);

        importStatements.push(
            `import ${name}Current from "../${dir}/${name}"`
        );
    });

    const dir = dest;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
        path.join(dir, "index.ts"),
        [
            ...importStatements,
            '',
            `const map = {`,
            `  ${importIdentifiers.map((identifier) => `${identifier} `)}`,
            `};`,
            '',
            `let nextName = idNameMap[${startName}Id];`,
            `while(1) {`,
            `  const current = map[\`\${nextName}Current\`];`,
            `  const nextId = current();`,
            '',
            `  if(nextId === null) {`,
            '    break;',
            `  }`,
            '',
            `  nextName = idNameMap[nextId];`,
            `}`
        ].join("\n")
    )
}