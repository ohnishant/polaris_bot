import { REST, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProp = {
    guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProp) {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(config.DISCORD_CLIENT, guildId),
            {
                body: commandsData,
            }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}
