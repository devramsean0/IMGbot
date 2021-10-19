 const {embedcolor, botname} = require('../../config.json');
 const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
 const { MessageEmbed } = require('discord.js');
  module.exports = class Img extends SlashCommand {
    constructor(context) {
      super(context, {
        name: "help",
        description: "help",
        options: [],
        guildOnly: process.env.dev
      });
    }
  
    async run(interaction) {
     await interaction.deferReply();
     const Embed = new MessageEmbed()
     .setColor(embedcolor)
     .setTitle(`${botname} | Help`)
     .addFields(
        {name: '/img {query}', value: 'Displays a image of your query'},
        {name: '/ping', value: 'gives you the ping to the bot'},
        {name: '/gif {query}', value: 'sometimes displays a image of your query othertimes the embed just dies and gives you a link.'},
        {name: '/api', value: 'See the Apis we use '}
     )
     await interaction.editReply({embeds: [Embed]});
    }
  };