import * as path from "path"

import codegen from "./codegen";
import getExportsMap from "./getExportsMap";

(async () => {
  const result = await getExportsMap("src/example");

  codegen(
    {
      runtime: path.resolve("src", "../runtime"),
      build: path.resolve("src", "../build"),
    },
    result
  );
})()
