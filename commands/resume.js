const { SlashCommandBuilder,} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resumes ongoing music"),
        async execute(interaction, queue) {
            try {
                if(queue.node.isPlaying()) return interaction.reply("the song is already playing")
                queue.node.resume();
                interaction.reply("the current track in being resumed")
            } catch(e){
                interaction.reply(`failed please try again error:${e}`)
            }
        }
}