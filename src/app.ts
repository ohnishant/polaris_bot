import { Client, Guild, Interaction } from "discord.js";
import { deployCommands } from "./deploy_commands";
import { commands } from "./commands";
import { config } from "./config";

const client = new Client({
    intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", (c) => {
    console.log(`${c.user.tag} is ready!`);
});

client.on("guildCreate", async (guild: Guild) => {
    await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);
