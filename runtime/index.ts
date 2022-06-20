import { idNameMap } from "./data"
import firstCurrent, { id as firstId } from "../src/example/first"
import secondCurrent from "../src/example/folder/second"
import thirdCurrent from "../src/example/folder/third"
import fourthCurrent from "../src/example/fourth"

const map = {
  firstCurrent ,firstId ,secondCurrent ,thirdCurrent ,fourthCurrent 
};

let nextName = idNameMap[firstId];
while(1) {
  const current = map[`${nextName}Current`];
  const nextId = current();

  if(nextId === null) {
    break;
  }

  nextName = idNameMap[nextId];
}