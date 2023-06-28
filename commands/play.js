const { useMasterPlayer, SearchResult } = require("discord-player");
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');


module.exports = {
    data:new SlashCommandBuilder()
            .setName("play")
            .setDescription("joins call and transcribes everything that is said")
            .addStringOption(option => 
                option.setName("query")
                .setRequired(true)
                .setDescription("Url for the video you want played in your voice call")
                ),
        async execute(interaction, queue) {
          const channel = interaction.member.voice.channel;
          if (!channel) return interaction.reply("herro join vc plz");
          const query = interaction.options.getString('query', true)

          await interaction.deferReply();
          const player = new useMasterPlayer();
          await player.extractors.loadDefault();

          try {
            if (query.substr(0,4) == "https") {
              const {track} = await player.play(channel, query);
              return await interaction.followUp(`song has been queued`)
            }

            const result = await player.search(query, {fallbackSearchEngine: 'youtube',})
            if (result.isEmpty()) return interaction.reply("query listed 0 results please try again");
            const tracks = result.tracks
            const title_1 = tracks[0].title;
            const title_2 = tracks[1].title;
            const title_3 = tracks[2].title;
            const title_4 = tracks[3].title;
            const title_5 = tracks[4].title;
            const button_1 = new ButtonBuilder()
            .setCustomId("1")
            .setLabel("1")
            .setStyle(ButtonStyle.Primary);
            const button_2 = new ButtonBuilder()
            .setCustomId("2")
            .setLabel("2")
            .setStyle(ButtonStyle.Primary);
            const button_3 = new ButtonBuilder()
            .setCustomId("3")
            .setLabel("3")
            .setStyle(ButtonStyle.Primary);
            const button_4 = new ButtonBuilder()
            .setCustomId("4")
            .setLabel("4")
            .setStyle(ButtonStyle.Primary);
            const button_5 = new ButtonBuilder()
            .setCustomId("5")
            .setLabel("5")
            .setStyle(ButtonStyle.Primary);
            
            const row = new ActionRowBuilder()
			      .addComponents(button_1, button_2, button_3, button_4, button_5);

           const response = await interaction.followUp({
              content: `the top 5 songs are \n track 1: ${title_1}\n track 2: ${title_2}\n track 3: ${title_3}\n track 4: ${title_4}\n track 5: ${title_5}`,
              components: [row],

            })
            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
              const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
              if (confirmation.customId === "1") {
                const {current_track} = await player.play(channel, tracks[0], {
                  nodeOptions: {
                    metadata: interaction
                  },
                });
                return await interaction.followUp(`${current_track.title} has been queued`)
              }
              if (confirmation.customId === "2") {
                const {current_track} = await player.play(channel, tracks[1], {
                  nodeOptions: {
                    metadata: interaction
                  },
                });
                return await interaction.followUp(`${current_track.title} has been queued`)
                
              }
              if (confirmation.customId === "3") {
                const {current_track} = await player.play(channel, tracks[2], {
                  nodeOptions: {
                    metadata: interaction
                  },
                });
                return await interaction.followUp(`${current_track.title} has been queued`)
              }
              if (confirmation.customId === "4") {
                const {current_track} = await player.play(channel, tracks[3], {
                  nodeOptions: {
                    metadata: interaction
                  },
                });
                return await interaction.followUp(`${current_track.title} has been queued`)
              }
              if (confirmation.customId === "5") {
                const {current_track} = await player.play(channel, tracks[4], {
                  nodeOptions: {
                    metadata: interaction
                  },
                });
                return await interaction.followUp(`${current_track.title} has been queued`)
              }
            } catch (e) {
              
              await interaction.editReply({ content: `a song has been chosen`, components: [] });
            }

            
            
            return interaction.followUp("adding to queue");
          }
          catch(e) {
            return interaction.followUp(`plz try again ${e}`);
          }
          
        }  
                
}