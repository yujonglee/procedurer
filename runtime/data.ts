import { id as firstId } from "../src/example/first"
import { id as secondId } from "../src/example/folder/second"
import { id as thirdId } from "../src/example/folder/third"
import { id as fourthId } from "../src/example/fourth"

export const ids = [firstId, secondId, thirdId, fourthId];

export const idNameMap = {
  [firstId]: "first",
  [secondId]: "second",
  [thirdId]: "third",
  [fourthId]: "fourth",
};
