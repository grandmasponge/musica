const { SlashCommandBuilder} = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("cantalope")
        .setDescription("says nah corn on the cob"),
    async execute(interaction) {
        await  interaction.reply('nah its corn on a cob');
    }

}