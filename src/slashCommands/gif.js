// tenor api setup
require('dotenv').config()
const Tenor = require("tenorjs").client({
    "Key": "0WR0OYH19EED", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});
// generic setup
const {embedcolor, botname} = require('../../config.json');
const SlashCommand = require("../lib/structures/SlashCommandPiece.js");
const { MessageEmbed } = require('discord.js');
 module.exports = class Img extends SlashCommand {
   constructor(context) {
     super(context, {
       name: "gif",
       description: "Gif",
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
    Tenor.Search.Query(query, "1").then(Results => {
        Results.forEach(Post => {
          const Embed = new MessageEmbed()
            .setColor(embedcolor)
            .setTitle(`${botname} | ${query} Gif`)
            .setDescription(`Not loading? use this link: <${Post.url}>`)
            .setImage(Post.url)
          interaction.editReply({embeds: [Embed]});
        });
    }).catch(console.error);
   }
 };