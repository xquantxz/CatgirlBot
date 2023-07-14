import { faker } from "@faker-js/faker";
import { db } from './database'

export async function get_catgirl_image(): Promise<string> {
    let res = await fetch("https://nekos.best/api/v2/neko")
    let data = await res.json()
    let url = data.results[0].url
    return url.toString();
}

export function gen_catgirl_name(): string {
    return faker.person.firstName("female");
}

export function new_catgirl(user_id: string, name: string, image_url: string) {
    let stmt = db.prepare('INSERT INTO Catgirl (owner_id, name, image_url) VALUES (?, ?, ?);').bind(user_id, name, image_url);
    stmt.run();
}

export function get_catgirls(user_id: string): number[] {
    let ids: number[] = [];

    let stmt = db.prepare('SELECT catgirl_id FROM Catgirl WHERE owner_id=?');
    let res: any[] = stmt.all(user_id)
    console.log(res);
    res.forEach((row) => {
        ids.push(row.catgirl_id)
    });
    return ids;
}

export function get_catgirl(catgirl_id: number) {
    let stmt = db.prepare('SELECT name,image_url FROM Catgirl WHERE catgirl_id=?');
    let res = stmt.get(catgirl_id);
    return res;
}

