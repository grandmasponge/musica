const { SlashCommandBuilder,} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skips ongoing track"),
        async execute(interaction, queue) {
            try {
                if(queue.size < 0) return interaction.reply("a song is not playign use the /play command to get a song to play nword")
                queue.node.skip();
                interaction.reply("track has been skipped")
            } catch(e){
                interaction.reply(`there is not song to be skipped`)
            }
        }
}