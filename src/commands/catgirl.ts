import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Colors } from "discord.js"
import { get_catgirl_image } from "../catgirl";

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('catgirl')
		.setDescription('Get cute catgirl image'),
	async handler(interaction: CommandInteraction) {
		// await interaction.reply('Pong!');
        let embed = new EmbedBuilder()
                        .setTitle("Catgirl")
                        .setColor(Colors.Green)
                        .setImage(await get_catgirl_image());

        await interaction.reply({embeds: [embed]});
	},
};