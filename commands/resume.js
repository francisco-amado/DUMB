const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("r")
        .setDescription("Resumes the ungodly crap you were listening to"),
    execute: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        {
            await interaction.reply("FFS there is no queue");
            return;
        }

        queue.setPaused(false);

        await interaction.reply("Your girlfriend/waifu is pissed again!")
    },
}