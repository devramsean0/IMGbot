const {embedcolor, botname} = require('../../config.json');
const fetch = require('node-fetch');
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
 module.exports = class Img extends SlashCommand {
   constructor(context) {
     super(context, {
       name: "img",
       description: "Img",
       options: [
           {
                name:"query",
                description:"Query the DB",
                required:"true",
                type:"STRING"
           }
       ],
       guildOnly: process.env.dev
     });
   }
 
   async run(interaction) {
    await interaction.deferReply();
    const query = interaction.options.getString('query');
    const { file, license, owner, width, height, filter, tags, tagMode } = await fetch(`https://loremflickr.com/json/g/320/240/${query}/all`).then(response => response.json());
    // buttons
    const Row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('imgadvanced')
      .setLabel('Advanced')
      .setStyle('DANGER')
    )
    const DisabledRow = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setCustomId('imgadvanced')
      .setLabel('Advanced')
      .setStyle('DANGER')
      .setDisabled('true')
    )
    // initial embed
    const Embed = new MessageEmbed()
    .setColor(embedcolor)
    .setTitle(`${botname} | ${query} Image`)
    .setImage(file)
    await interaction.editReply({embeds: [Embed], components: [Row]});
    // collector
    const collector = interaction.channel.createMessageComponentCollector({ time: 4000 });
    collector.on('collect', async i => {
	    if (i.customId === 'imgadvanced') {
        const AdvancedEmbed = new MessageEmbed()
        .setColor(embedcolor)
        .setTitle(`${botname} | ${query} Image`)
        .setImage(file)
        .addFields(
          {name: 'file', value: `${file}`},
          {name: 'license', value: `${license}`},
          {name: 'owner', value: `${owner}`},
          {name: 'width', value: `${width}`},
          {name: 'height', value: `${height}`},
          {name: 'filter', value: `${filter}`},
          {name: 'tags', value: `${tags}`},
          {name: 'tagMode', value: `${tagMode}`}
        )
		    await i.reply({embeds: [AdvancedEmbed], components: [DisabledRow]})
	    } else return;
    });
collector.on('end', collected => {
interaction.editReply({embeds: [Embed], components: [DisabledRow]});
});
}
};