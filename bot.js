require('dotenv').config()
const { Client, Intents, Guild } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('Ready!')
});
client.on('messageCreate', async message => {
	if (message.content.toLowerCase() === '*setup') {
		const data = [
            {
                name:"help",
                description:"The Help Command",
            },
            {
                name:"img",
                description:"The Image Lookup Command",
            },
            {
                name:"gif",
                description:"The Gif Lookup Command",
            }
        ];
        console.log(data)
		const command = await client.guilds.cache.get(message.guild.id)?.commands.set(data);
		console.log(command);
	}
});
client.login(process.env.token);