const Database = require('better-sqlite3');
const { DB_PATH, SCHEMA_PATH } = require('./constant');
import * as fs from "node:fs"

export function new_catgirl(db, user_id: string, name: string, image_url: string) {
    let stmt = db.prepare('INSERT INTO Catgirl (owner_id, name, image_url) VALUES (?, ?, ?);').bind(user_id, name, image_url);
    stmt.run()
}

export function get_catgirls(db, user_id: string): number[] {
    let ids: number[] = [];
    
    let stmt = db.prepare('SELECT catgirl_id FROM Catgirl WHERE owner_id=?');
    let res: any[] = stmt.all(user_id)
    console.log(res);
    res.forEach((row) => {
        ids.push(row.catgirl_id)
    });
    return ids;
}

export function get_catgirl(db, catgirl_id: number) {
    let name = "uwu";
    // db.get('SELECT name FROM Catgirl WHERE catgirl_id=?', catgirl_id,(err, row)=>{name=row||"uwu"});
    let stmt = db.prepare('SELECT name,image_url FROM Catgirl WHERE catgirl_id=?');
    let res = stmt.get(catgirl_id);
    return res;
}

function init_schema(db) {
    console.log("initializing schema");
    let schema: Buffer = fs.readFileSync(SCHEMA_PATH);
    db.exec(schema.toString());
}

export let db = new Database(DB_PATH,{verbose:console.log});
init_schema(db);
