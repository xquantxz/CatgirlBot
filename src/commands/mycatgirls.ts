import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Colors, ComponentType, ButtonInteraction, Interaction, InteractionResponse, MessagePayload } from "discord.js"
import {db, get_catgirl, get_catgirls, new_catgirl} from "../database";
import { PageUI, PageUIContent } from "../ui/page";

async function send_reply(interaction: CommandInteraction|ButtonInteraction, pages: PageUI, res?: InteractionResponse) {
    if (res) {
        res.edit({
            embeds: [pages.getEmbed()],
            components: [pages.getActionRow()]
        });
    } else {
        res = await interaction.reply({
            embeds: [pages.getEmbed()],
            components: [pages.getActionRow()]
        });

        const collector = res.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 3_600_000
        });
    
        collector.on('collect', async (i: ButtonInteraction) => {
            if (i.customId == "left") {
                pages.prevPage();
            } else if (i.customId == "right") {
                pages.nextPage();
            }
            i.update({})
            await send_reply(interaction, pages, res);
        });
    }
}

module.exports = {
	cmd: new SlashCommandBuilder()
		.setName('mycatgirls')
		.setDescription('See your cute catgirls'),
	async handler(interaction: CommandInteraction) {
        let catgirls = get_catgirls(db, interaction.user.id);
        if (catgirls.length == 0) {
            await interaction.reply("You have no catgirls");
            return;
        }

        let content: PageUIContent[] = [];

        for (let id of catgirls) {
            let data = get_catgirl(db, id);
            content.push({
                description: `**Name: ${data.name}**\nA cute catgirl indeed`,
                image_url: data.image_url
            });
        }
        let pages = new PageUI("Your Catgirls", content);
        await send_reply(interaction, pages);
	},
};