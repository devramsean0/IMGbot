/**
 * This is the most basic slash command example I can offer you guys, it's not
 * using the builder but that can easily be changed. If you want your slash
 * commands to be guild specific, you should consult the discordjs.guide for
 * how to register them to guilds, here's a link;
 * https://discordjs.guide/interactions/registering-slash-commands.html#guild-commands
 * 
 */
const {embedcolor, botname} = require('../../config.json');
const fetch = require('node-fetch');
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
const { MessageEmbed } = require('discord.js');
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
    const { file } = await fetch(`https://loremflickr.com/json/g/320/240/${query}/all`).then(response => response.json());
    console.log(file)
    const Embed = new MessageEmbed()
    .setColor(embedcolor)
    .setTitle(`${botname} | ${query} Image`)
    .setImage(file)
    await interaction.editReply({embeds: [Embed]});
   }
 };