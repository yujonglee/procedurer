import * as fs from "fs";
import * as path from "path"

import { ids } from "../data"

export const generateIdType = () => {
  fs.writeFileSync(
    path.resolve(__dirname, "../types.ts"),
    `export type ID = ${ids.map((id) => `"${id}"`).join(" | ")};`
  );
}
