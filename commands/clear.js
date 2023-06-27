
const { SlashCommandBuilder,} = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("skips ongoing track"),
        async execute(interaction, queue) {
            try {
                queue.clear();
                interaction.reply("queue has been cleared")
            } catch(e){
                interaction.reply(`failed please try again error:${e}`)
            }
        }
}