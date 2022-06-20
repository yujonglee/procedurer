import { exec } from "child_process";

import type { ExportsMap } from "../getExportsMap";
import validate from "./validate";
import { generateBuild, generateData } from "./first";
import {
    generateIdTypeGenerator, generateIdUniqunessValidator, generateGeneratorIndex, generateValidatorIndex
} from "./second";

const first = (dest: string, exportsMap: ExportsMap) => {
    generateData(dest, exportsMap);
    generateBuild(dest, exportsMap);
}

const second = (dest: string) => {
    generateGeneratorIndex(dest);
    generateIdTypeGenerator(dest);

    generateValidatorIndex(dest);
    generateIdUniqunessValidator(dest);
}

type Destination = {
    runtime: string;
    build: string;
}
export default function codegen(dest: Destination, exportsMap: ExportsMap) {
    const errors = validate(exportsMap);

    if (errors.length !== 0) {
        console.error(errors.join("\n"));

        return;
    }

    first(dest.runtime, exportsMap);

    second(dest.runtime);
    exec(`node -r esbuild-register ${dest.runtime}/validator`, (e, stdout) => {
        if (stdout.length > 1) {
            console.error(stdout);
        }

        if (e) {
            console.error(e);
        }
    });
    exec(`node -r esbuild-register ${dest.runtime}/generator`, (e) => {
        if (e) {
            console.error(e);
        }
    });
}