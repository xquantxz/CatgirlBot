import { db } from './database'

export function get_warnings(guild_id: string, user_id: string) {
    let stmt = db.prepare('SELECT * FROM Warning WHERE guild_id=? AND user_id=?');
    let res = stmt.all(guild_id, user_id)
    return res
}

export function add_warning(guild_id: string, admin_id: string, user_id: string, reason: string) {
    let stmt = db.prepare('INSERT INTO Warning (user_id, guild_id, admin_id, reason) VALUES (?,?,?,?)').bind(user_id,guild_id,admin_id,reason);
    stmt.run();
}

export function delete_all_warnings(guild_id: string, user_id: string) {
    let stmt = db.prepare('DELETE FROM Warning WHERE guild_id=? AND user_id=?').bind(user_id,guild_id);
    stmt.run();
}

