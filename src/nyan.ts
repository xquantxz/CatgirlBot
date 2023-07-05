// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, Collection, AttachmentBuilder } from 'discord.js';
import * as path from 'node:path'
import * as fs from 'node:fs'

import { NyanCommand } from './command';
import { get_catgirl_image } from './catgirl';

export class NyanClient extends Client {
    commands: Collection<String, Function>

    constructor(options) {
        super(options);
        this.commands = new Collection();

        setInterval(async () => {
            let chan = await this.channels.fetch("1125158367225188452");
            if (chan === null) {
                return
            }

            if (!chan.isTextBased()) {
                return
            }

            let image = new AttachmentBuilder(await get_catgirl_image());
            chan.send({files: [image]});
        }, 1000*60*10)
    }

    load_commands(commandDir: string) {
        for (const file of fs.readdirSync(commandDir).filter((v) => v.endsWith(".js"))) {
            const command: NyanCommand = require(path.join(commandDir, file));
            if ('cmd' in command && 'handler' in command) {
                this.commands.set(command.cmd.name, command.handler);
                console.log(`Command ${command.cmd.name} loaded`);
            }
        }
    }
}
