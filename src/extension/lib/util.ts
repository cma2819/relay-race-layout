import * as fs from "fs";

export const removeEmpty = (strs: string[]): string[] => {
  return strs.filter(str => str !== "");
};

export const readFile = async (path: string): Promise<Buffer> => {
  return await fs.readFileSync(path);
};
