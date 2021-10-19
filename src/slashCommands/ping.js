const {embedcolor, botname} = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
module.exports = class Ping extends SlashCommand {
  constructor(context) {
    super(context, {
      name: "ping",
      description: "Pongs when pinged.",
      options: [],
      guildOnly: process.env.dev
    });
  }

  async run(interaction) {
    await interaction.deferReply();
    const reply = await interaction.editReply("Ping?");
    const Embed = new MessageEmbed()
    .setColor(embedcolor)  
    .setTitle(`${botname} | Ping`)
    .setDescription(`Latency: ${reply.createdTimestamp - interaction.createdTimestamp}ms`)
    await interaction.editReply({embeds: [Embed]});
  }
};