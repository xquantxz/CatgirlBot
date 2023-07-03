import { SlashCommandBuilder } from "discord.js"

export interface NyanCommand {
    cmd: SlashCommandBuilder,
    handler: Function
}