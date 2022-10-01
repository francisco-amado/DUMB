const { SlashCommandBuilder } = require("@discordjs/builders")
const { getLyrics, getSong } = require("genius-lyrics-api");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("l")
        .setDescription("Gets the third-grade level poetry that the singer is currently blabbering"),

    execute: async ({ client, interaction }) => {

        const queue = client.player.getQueue(interaction.guildId);

        if (!queue)
        {
            await interaction.reply("FFS there is no queue. Are you stupid?");
        }

        const playerInfo = queue.current.title;

        const songInfo = playerInfo.split(" - ");

        const options = {
            apiKey: process.env.GENIUS,
            title: songInfo[1].split("(")[0],
            artist: songInfo[0],
            optimizeQuery: true,
        };

        const lyric = await getLyrics(options);
        const song = await getSong(options);

        const embed = {
            author: { name: "Lyrics" },
            title: song.title,
            description: lyric + `\n*** [link](${song.url}) ***`,
            thumbnail: { url: song.albumArt },
        };

        await interaction.reply({
            embeds: [embed]
        })
    }

}