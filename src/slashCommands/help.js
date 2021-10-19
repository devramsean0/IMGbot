/**
 * This is the most basic slash command example I can offer you guys, it's not
 * using the builder but that can easily be changed. If you want your slash
 * commands to be guild specific, you should consult the discordjs.guide for
 * how to register them to guilds, here's a link;
 * https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
 * 
 */
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
        {name: '/gif {query}', value: 'not ready yet!'},
     )
     await interaction.editReply({embeds: [Embed]});
    }
  };