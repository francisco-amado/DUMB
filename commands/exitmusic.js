const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
        .setName("exit")
        .setDescription("Don't do this, for your own sake"),
	execute: async ({ client, interaction }) => {

		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
		{
			await interaction.reply("FFS there is no queue. Are you stupid?")
			return;
		}

		queue.destroy();

        await interaction.reply("You are kicking me? I'll destroy you and your family moron")
	},
}