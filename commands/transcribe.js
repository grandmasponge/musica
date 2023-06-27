const { SlashCommandBuilder,} = require("discord.js");
const { useMasterPlayer } = require("discord-player");


module.exports = {
    data:new SlashCommandBuilder()
            .setName("play")
            .setDescription("joins call and transcribes everything that is said")
            .addStringOption(option => 
                option.setName("query")
                .setRequired(true)
                .setDescription("Url for the video you want played in your voice call")
                ),
        async execute(interaction) {
          const channel = interaction.member.voice.channel;
          if (!channel) return interaction.reply("herro join vc plz");
          const query = interaction.options.getString('query', true)

          await interaction.deferReply();
          const player = new useMasterPlayer();
          await player.extractors.loadDefault();

          try {
            const { track } = await player.play(channel, query, {
              nodeOptions: {
                metadata: interaction
              }
            });
            
            return interaction.followUp("adding to queue");
          }
          catch(e) {
            return interaction.followUp(`plz try again ${e}`);
          }
          
        }  
                
}