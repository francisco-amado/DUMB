const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("n")
        .setDescription("Skips the current abomination of a song"),

    execute: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        {
            await interaction.reply("FFS there is no queue. Are you stupid?");
            return;
        }

        const currentSong = queue.current

        queue.skip()

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${currentSong.title} has been skipped. Thank God!`)
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    },
}