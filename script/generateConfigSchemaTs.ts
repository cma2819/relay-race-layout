import { compileFromFile } from "json-schema-to-typescript";
import * as fs from "fs";
import * as path from "path";

(async () => {
  const rootPath = path.resolve(__dirname, "../");
  const configSchemaPath = path.resolve(__dirname, "../configschema.json");
  const generatedPath = path.resolve(__dirname, "../src/nodecg/generated");

  const ts = await compileFromFile(configSchemaPath, {
    cwd: rootPath
  });
  const tsName = "configschema.d.ts";
  await fs.writeFileSync(path.resolve(generatedPath, tsName), ts);
})();
