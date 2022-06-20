import * as fs from "fs"
import * as path from "path"

import * as esbuild from "esbuild";

export type ExportsMap = {
  [path: string]: string[]
}

export default async function getExportsMap(base: string) {
  const files: string[] = readDirRecursive(base);
  const datas = await Promise.all(files.map(getExports));
  
  return datas.reduce((acc, { path, exports }) => ({ 
      ...acc,
      [path]: exports
  }), {});
}

function readDirRecursive(dir: string): string[] {
  const files = fs.readdirSync(dir);
  
  const fullPaths: (string[] | string)[] = files.map((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
       return readDirRecursive(fullPath);
    }  

    return fullPath;
  });

  return fullPaths.flat();
}

async function getExports(path: string) {
  const { metafile } = await esbuild.build({
    entryPoints: [path],
    platform: "node",
    metafile: true,
    write: false,
    logLevel: "silent",
  });

  const { entryPoint, exports } = Object.values(metafile.outputs)[0];
  
  return { path: entryPoint, exports };
}
