import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, SlashCommandStringOption, SlashCommandUserOption } from "discord.js";
import { add_warning, delete_all_warnings, get_warnings } from "../warning";

const { MAX_WARNINGS } = require('../constant');

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption((option: SlashCommandUserOption) => {
            return option.setName("user")
                .setDescription("User to warn")
                .setRequired(true);
        })
        .addStringOption((option: SlashCommandStringOption) => {
            return option.setName("reason")
                .setDescription("Reason")
                .setRequired(false);
        }),
	async handler(interaction: CommandInteraction) {
        let user = interaction.options.getUser("user");
        let admin = interaction.user;
        let reason = interaction.options.get("reason")?.value?.toString() ?? "No reason provided"

        let guild = interaction.guild;

        if (!guild || !user) {
            console.error("Something went wrong with warn command");
            return;
        }

        let member = guild.members.cache.get(user.id);

        if (!member) {
            console.error("warn: member not found");
            return;
        }

        if (user.id == interaction.client.user.id) {
            await interaction.reply("Not funny");
            return;
        }

        if (user.id == admin.id) {
            await interaction.reply("Cant warn yourself");
            return;
        }

        if (member.permissions.has("Administrator")) {
            await interaction.reply("Cant warn admin");
            return;
        }

        if (get_warnings(guild.id, user.id).length >= MAX_WARNINGS) {
            await member.ban({reason: "Too many warnings"});
            delete_all_warnings(guild.id, user.id);
        } else {
            add_warning(guild.id, admin.id, user.id, reason);
            await interaction.reply(`<@${user.id}> has been warned\nReason: ${reason}`);
        }
	},
};
