const { SlashCommandBuilder,} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pauses the ongoing queue"),
        async execute(interaction, queue) {
            if (queue.node.isPaused())
            return interaction.reply("the song is current paused")
            try {
                queue.node.pause();
                interaction.reply("the current track is paused")
            } catch(e){
                interaction.reply(`failed please try again error:${e}`)
            }
        }
}