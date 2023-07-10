import { ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, Embed, EmbedBuilder } from "discord.js";

export interface PageUIContent {
    description: string,
    image_url?: string
}

export class PageUI {
    private page = 0;
    title: string;
    content: PageUIContent[];

    constructor(title: string, content: PageUIContent[]) {
        if (content.length == 0) {
            throw new Error("Empty content list");
        }
        this.title = title;
        this.content = content;
    }

    getEmbed(): EmbedBuilder {
        let content = this.content[this.page];

        let embed = new EmbedBuilder()
            .setTitle(this.title)
            .setColor(Colors.Green)
            .setDescription(content.description);

        if (content.image_url)
            embed = embed.setImage(content.image_url);
        
        return embed;
    }

    getActionRow(): ActionRowBuilder<ButtonBuilder> {
        let leftbtn = new ButtonBuilder()
			.setCustomId('left')
            .setEmoji('⬅️')
			.setStyle(ButtonStyle.Secondary)
        
        // const middlebtn = new ButtonBuilder()
        //     .setLabel('*')
        //     .setStyle(ButtonStyle.Secondary);
        
        let rightbtn = new ButtonBuilder()
			.setCustomId('right')
            .setEmoji('➡️')
			.setStyle(ButtonStyle.Secondary);
        
        if (this.isFirstPage()) {
            leftbtn = leftbtn.setDisabled(true);
        }

        if (this.isLastPage()) {
            rightbtn = rightbtn.setDisabled(true);
        }
                
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(leftbtn, rightbtn);
        
        return row;
    }

    nextPage() {
        if (this.page+1 < this.content.length) this.page += 1;
    }

    prevPage() {
        if (this.page > 0) this.page -= 1;
    }

    isFirstPage(): boolean {
        return this.page == 0;
    }

    isLastPage(): boolean {
        return this.page == this.content.length-1;
    }
}
