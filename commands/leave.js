const { SlashCommandBuilder,} = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("leaves call"),
        async execute(interaction) {
            const player = useMasterPlayer();
            try {
                interaction.reply("leaving (i have deleted the queue as well tehe)")
                player.destroy()
            } catch(e){
                interaction.reply(`failed please try again error:${e}`)
            }
        }
}