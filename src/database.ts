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
    let stmt = db.prepare('SELECT name,image_url FROM Catgirl WHERE catgirl_id=?');
    let res = stmt.get(catgirl_id);
    return res;
}

export function get_warnings(db, guild_id: string, user_id: string) {
    let stmt = db.prepare('SELECT * FROM Warning WHERE guild_id=? AND user_id=?');
    let res = stmt.all(guild_id, user_id)
    return res
}

export function add_warning(db, guild_id: string, admin_id: string, user_id: string, reason: string) {
    let stmt = db.prepare('INSERT INTO Warning (user_id, guild_id, admin_id, reason) VALUES (?,?,?,?)').bind(user_id,guild_id,admin_id,reason)
    stmt.run()
}

function init_schema(db) {
    console.log("initializing schema");
    let schema: Buffer = fs.readFileSync(SCHEMA_PATH);
    db.exec(schema.toString());
}

export let db = new Database(DB_PATH,{verbose:console.log});
init_schema(db);
