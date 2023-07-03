import { SlashCommandBuilder } from "discord.js"

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping catgirls'),
	async handler(interaction) {
		await interaction.reply('Pong!');
	},
};