const {embedcolor, botname} = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
module.exports = class Ping extends SlashCommand {
  constructor(context) {
    super(context, {
      name: "api",
      description: "api",
      options: [],
      guildOnly: process.env.dev
    });
  }

  async run(interaction) {
    await interaction.deferReply();
    const Embed = new MessageEmbed()
    .setColor(embedcolor)  
    .setTitle(`${botname} | Api`)
    .setDescription('The apis we use')
    .addFields(
        {name: 'img CMD', value: 'we use lorem flicker for the api <https://loremflickr.com>'},
        {name: 'gif CMD', value: 'we have not decided yet!'},
    )
    await interaction.editReply({embeds: [Embed]});
  }
};