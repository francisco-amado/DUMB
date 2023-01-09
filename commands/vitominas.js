const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vt")
        .setDescription("Plays a random video from the greatest animator of all time"),

    execute: async ({ client, interaction }) => {

        if (!interaction.member.voice.channel) return interaction
            .reply("Are you in a voice channel, you idiot?");

        const queue = await client.player.createQueue(interaction.guild);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        const videoList = [
            "https://www.youtube.com/watch?v=a6lindE5UA8",
            "https://www.youtube.com/watch?v=mqPduETfiMg",
            "https://www.youtube.com/watch?v=BJHLKuw8p0Q",
            "https://www.youtube.com/watch?v=9UuXzVmeOPo",
            "https://www.youtube.com/watch?v=iImuWuwZmHo",
            "https://www.youtube.com/watch?v=WoF--fCLl98",
            "https://www.youtube.com/watch?v=SKJYJijeI10",
            "https://www.youtube.com/watch?v=XgHMCXi3CwY",
            "https://www.youtube.com/watch?v=wWPLutkgV6I",
            "https://www.youtube.com/watch?v=g7pWoMHpDU0",
            "https://www.youtube.com/watch?v=Gg9YbXA9E-k",
            "https://www.youtube.com/watch?v=4pI6n4YaqSY",
            "https://www.youtube.com/watch?v=czG9t9w5m2k",
            "https://www.youtube.com/watch?v=NWa0320TGwU",
            "https://www.youtube.com/watch?v=_aottGYmmTQ",
            "https://www.youtube.com/watch?v=fq9Q2uOvomM",
            "https://www.youtube.com/watch?v=8a1uT5KjueM",
            "https://www.youtube.com/watch?v=xQcgwy4MQAA",
            "https://www.youtube.com/watch?v=njcGU3g5MhE",
            "https://www.youtube.com/watch?v=HYbIu-TCb0Q",
            "https://www.youtube.com/watch?v=rceZYDtouGw",
            "https://www.youtube.com/watch?v=Dv_oM2ZsieY"
        ];

        const URL = videoList[Math.floor(Math.random() * videoList.length)];

        await interaction.reply(URL);
    },
}