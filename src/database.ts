const Database = require('better-sqlite3');
const { DB_PATH, SCHEMA_PATH } = require('./constant');
import * as fs from "node:fs"

function init_schema(db) {
    console.log("initializing schema");
    let schema: Buffer = fs.readFileSync(SCHEMA_PATH);
    db.exec(schema.toString());
}

export let db = new Database(DB_PATH,{verbose:console.log});
init_schema(db);
