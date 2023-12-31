const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Events} = require("discord.js");
const {token} = require("./config.json");
const { Player, GuildQueuePlayerNode } = require("discord-player");
const { YouTubeExtractor } = require("@discord-player/extractor");

const client = new Client({
	intents: [		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();
const player = new Player(client);
const queue = new GuildQueuePlayerNode()

const commandsPath = path.join(__dirname, "/commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, "/events");
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`tobozo has started to play ${track.title}`);
});

player.events.on('emptyChannel', (queue) => {
    queue.metadata.channel.send(`Leaving voice channel bitchass`);
});
player.events.on('emptyQueue', (queue) => {
	queue.metadata.channel.send(`queue is empty`);
});


client.login(token)