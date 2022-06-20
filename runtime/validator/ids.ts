import { ids } from "../data"
import { duplicatedId } from "../../src/compiler/error";

export const validateIdUniquness = () => {
  const set = new Set<string>();

  for (const id of ids) {
    if (set.has(id)) {
      return [duplicatedId(id)];
    }

    set.add(id);
  }

  return [];
}