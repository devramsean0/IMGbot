const { Listener } = require('@sapphire/framework');
module.exports = class guildCreateListener extends Listener {
	constructor(context) {
		super(context, {
			once: false,
			event: 'guildCreate',
		});
	}
    run(guild) {
        this.container.client.user.setActivity(`/help | ${this.container.client.guilds.cache.size} Servers`);
	}
};