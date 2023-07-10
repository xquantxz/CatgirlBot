import { faker } from "@faker-js/faker";

export async function get_catgirl_image(): Promise<string> {
    let res = await fetch("https://nekos.best/api/v2/neko")
    let data = await res.json()
    let url = data.results[0].url
    return url.toString();
}

export function gen_catgirl_name(): string {
    return faker.person.firstName("female");
}