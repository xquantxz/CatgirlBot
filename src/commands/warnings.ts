import { CommandInteraction, Interaction, PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption, SlashCommandUserOption, User } from "discord.js"
import { add_warning, db, get_warnings } from "../database";

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('warnings')
		.setDescription('See warnings')
        .setDMPermission(false)
        .addUserOption((option: SlashCommandUserOption) => {
            return option.setName("user")
                .setDescription("User")
                .setRequired(false);
        }),
	async handler(interaction: CommandInteraction) {
        let user = interaction.options.getUser("user") ?? interaction.user;
        let guild = interaction.guild

        if (!guild) {
            console.error("Something went wrong with warnings command");
            return;
        }

        let warnings = get_warnings(db, guild.id, user.id);
        let message = warnings.length
                        ? `Warnings for <@${user.id}>\n`
                        : `<@${user.id}> has no warnings`;

        for (let w of warnings) {
            message += `- ${w.reason}\n`;
        }

		await interaction.reply(message);
	},
};
