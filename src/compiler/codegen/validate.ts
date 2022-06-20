import * as path from "path"

import type { ExportsMap } from "../getExportsMap";
import { duplicatedName, multipleStartingPoints, noId } from "../error";

type Validator = (exportsMap: ExportsMap) => string[];

const validateIds: Validator = (exportsMap: ExportsMap) => {
    return Object.entries(exportsMap).reduce((acc, [path, namedExports]) => {
        if (namedExports.includes("id")) {
            return acc;
        }

        return [...acc, noId(path)];
    }, [])
}

const validateUnique: Validator = (exportsMap: ExportsMap) => {
    const set = new Map<string, string>();

    for (const file of Object.keys(exportsMap)) {
        const { name } = path.parse(file);
    
        if (set.has(name)) {
            return [duplicatedName([set.get(name)!, file])];
        }
    
        set.set(name, file);
    }

    return [];
}

const validateStart: Validator = (exportsMap: ExportsMap) => {
    const startingPoints =  Object.entries(exportsMap).filter(([_, namedExports]) => (
        !namedExports.includes("previous")
    ))

    if (startingPoints.length === 1) {
        return [];
    }

    return [multipleStartingPoints(startingPoints.map(([path]) => path))]
}

export default function validate(exportsMap: ExportsMap) {
    return [
        ...validateIds(exportsMap),
        ...validateStart(exportsMap),
        ...validateUnique(exportsMap),
    ];
}
