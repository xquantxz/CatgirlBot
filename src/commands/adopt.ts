import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Colors } from "discord.js"
import {db, get_catgirls, new_catgirl} from "../database";
import { gen_catgirl_name, get_catgirl_image } from "../catgirl";

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('adopt')
		.setDescription('Adopt a cute catgirl nyaan!'),
	async handler(interaction: CommandInteraction) {
		let user_id = interaction.user.id;

		let embed = new EmbedBuilder()
                        .setTitle("Catgirl adoption")
                        .setColor(Colors.Green)

		if (get_catgirls(db, user_id).length >= 3) {
			embed = embed.setDescription("You have 3 catgirls already >.<").setColor(Colors.Red);
			await interaction.reply({embeds: [embed]});
			return
		}

		let image_url = await get_catgirl_image();
		let name = gen_catgirl_name();

		new_catgirl(db, user_id, name, image_url);
		embed = embed
				.setDescription("You adopted a cute neko girl!")
				.setImage(image_url);
		
        await interaction.reply({embeds: [embed]});
	},
};