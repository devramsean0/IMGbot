const { Listener } = require('@sapphire/framework');
module.exports = class guildDeleteListener extends Listener {
	constructor(context) {
		super(context, {
			once: false,
			event: 'guildDelete',
		});
	}
    run(guild) {
        this.container.client.user.setActivity(`/help | ${this.container.client.guilds.cache.size} Servers`);
	}
};