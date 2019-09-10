import { compileFromFile } from 'json-schema-to-typescript';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
    const schemasPath = path.resolve(__dirname, '../schemas');
    const generatedPath = path.resolve(__dirname, '../src/nodecg/generated');
    const schemas = await fs.readdirSync(schemasPath);

    schemas.forEach(async (schema) => {
        if (path.extname(schema) !== '.json') {
            return;
        }
        const ts = await compileFromFile(path.join(schemasPath, schema), { "cwd": schemasPath });
        const tsName = path.basename(schema, '.json') + '.d.ts';
        await fs.writeFileSync(path.resolve(generatedPath, tsName), ts); 
    })
})();
