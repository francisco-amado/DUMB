const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("p")
        .setDescription("Plays Weezer or anime theme songs from YouTube")
                .addStringOption(option =>
                    option.setName("writeheredumbass")
                        .setDescription("wtw")
                        .setRequired(true)),

    execute: async ({ client, interaction }) => {

        if (!interaction.member.voice.channel) return interaction
            .reply("Are you in a voice channel, you idiot?");

        const queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new EmbedBuilder();

        let url = interaction.options.getString("writeheredumbass")
        const result = await client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (result.tracks.length === 0)
            return interaction.editReply("Try something that more than 2 people know")

        const song = result.tracks[0]

        await queue.addTrack(song)
        embed
            .setDescription(`**[${song.title}](${song.url})** has been added to the queue. Happy now?`)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Duration: ${song.duration}`})

        if (!queue.playing) await queue.play()

        await interaction.reply({
            embeds: [embed]
        })
    },
}