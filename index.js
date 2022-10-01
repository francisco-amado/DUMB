require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const { Player } = require("discord-player")
const fs = require('node:fs');
const path = require('node:path');
const {setTimeout: wait} = require("node:timers/promises");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

client.on("ready", () => {

    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST().setToken(process.env.TOKEN);
    for (const guildId of guild_ids)
    {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            {body: commands})
            .then(() => console.log('Successfully updated commands for guild ' + guildId))
            .catch(console.error);

        console.log("DUMB is on tha house");
    }
});

client.on("interactionCreate", async interaction => {

    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;



    try {
        await command.execute({client, interaction});
    } catch(error) {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command", ephemeral: true});
    }
});

client.login(process.env.TOKEN);
