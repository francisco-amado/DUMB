const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("s")
        .setDescription("Pauses the horrible song you chose"),
    execute: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        {
            await interaction.reply("FFS there is no queue. Are you stupid?")
            return;
        }
        queue.setPaused(true);

        await interaction.reply("Time to go take a leak!")
    },
}