const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trex")
        .setDescription("Plays a random song from some portuguese unknown shitty band"),

    execute: async ({ client, interaction }) => {

        if (!interaction.member.voice.channel) return interaction
            .reply("Are you in a voice channel, you idiot?");

        const queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new EmbedBuilder();

        let songList = [
            "sweet memories treewax",
            "sunny days treewax bleak fall",
            "tired treewax bleak fall",
            "stormy eyes calhambirintho treewax",
            "storge treewax bleak fall",
            "ye yea yeah treewax bleak fall",
            "rabies treewax bleak fall",
            "wakizashi treewax bleak fall",
            "hey you treewax bleak fall",
            "dont hate you treewax bleak fall",
            "witch treewax bleak fall",
            "frankenstein treewax bleak fall"
        ];

        const search = songList[Math.floor(Math.random() * songList.length)];

        const result = await client.player.search(search, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });

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