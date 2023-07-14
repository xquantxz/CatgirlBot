import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption, SlashCommandUserOption, User } from "discord.js"
import { get_warnings } from "../warning";

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

        let embed = new EmbedBuilder()
                        .setTitle("Warnings")
                        .setColor(Colors.Blue)
                        .setThumbnail(user.avatarURL());

        if (!guild) {
            console.error("Something went wrong with warnings command");
            return;
        }

        let warnings = get_warnings(guild.id, user.id);

        let message = warnings.length
                        ? `Warnings for <@${user.id}>\n`
                        : `<@${user.id}> has no warnings`;
        embed = embed.setDescription(message);

        for (let w of warnings) {
            embed = embed.addFields({
                name: 'Warning',
                value:`${w.reason}`,
                inline: true
            });
        }

		await interaction.reply({embeds: [embed]});
	},
};

