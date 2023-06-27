const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`nahh its corn on the cob ${client.user.tag}`);
	}
};