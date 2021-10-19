/**
 * This is just a modified version of the example ready event
 * provided by the Sapphire Dev team.
 * 
 * The original code can be found here;
 * https://github.com/sapphiredev/examples/blob/main/examples/with-javascript/src/listeners/ready.js
 */
const { Listener } = require("@sapphire/framework");
const { version } = require("../../package.json");
const { blue, gray, green, magenta, magentaBright, white, yellow, red } = require("colorette");
 
const dev = process.env.DEV;
 
module.exports = class extends Listener {
  constructor(context) {
    super(context, {
      once: true
    });
 
    this.style = dev ? yellow : blue;
  }
 
  async run() {
    await this.createSlashCommands();
    console.log('Ready!')
    this.printStoreDebugInformation();
    this.container.client.user.setActivity(`${this.container.client.options.defaultPrefix}help | ${this.container.client.guilds.cache.size} Servers`);
  }
 
  async createSlashCommands() {
  // this function will tell the SlashCommandStore to update the global and guild commands
    const slashCommandsStore = this.container.stores.get("slashCommands");
 
    if (slashCommandsStore) {
      try {
        console.log(blue("Started refreshing application (/) commands."));
        await slashCommandsStore.registerCommands();
        console.log(green("Successfully reloaded application (/) commands."));
      } catch (err) {
        console.log(red(err));
      }
    }
  }
  printStoreDebugInformation() {
    const { client, logger } = this.container;
    const stores = [...client.stores.values()];
    const last = stores.pop();
 
    for (const store of stores) logger.info(this.styleStore(store, false));
    logger.info(this.styleStore(last, true));
  }
 
  styleStore(store, last) {
    return gray(`${last ? "└─" : "├─"} Loaded ${this.style(store.size.toString().padEnd(3, " "))} ${store.name}.`);
  }
};