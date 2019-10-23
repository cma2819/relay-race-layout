import { compileFromFile } from "json-schema-to-typescript";
import * as fs from "fs";
import * as path from "path";

(async () => {
  const args = process.argv;
  if (args.length !== 4) {
    throw new Error("Invalid Arguments.");
  }

  const cwd = process.cwd();
  const sourcePath = args[2];
  const destPath = args[3];
  const schemasPath = path.resolve(cwd, sourcePath);
  const generatedPath = path.resolve(cwd, destPath);
  const schemas = await fs.readdirSync(schemasPath);

  schemas.forEach(async schema => {
    if (path.extname(schema) !== ".json") {
      return;
    }
    const ts = await compileFromFile(path.join(schemasPath, schema), {
      cwd: schemasPath
    });
    const tsName = path.basename(schema, ".json") + ".d.ts";
    await fs.writeFileSync(path.resolve(generatedPath, tsName), ts);
  });
})();
