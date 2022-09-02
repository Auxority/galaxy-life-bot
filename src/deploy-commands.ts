import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import { config } from "dotenv";
import Util from "./util.js";

config();

(async() => {
    const files = await Util.getCommandFiles(`./src/commands`);

    const commands = [];
    for (const file of files) {
        const commandModule = await import(`./commands/${file}`);
        const command = new commandModule.default();
        console.log(`Loading ${command.name} command..`);
        const newCommand = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description);
        commands.push(newCommand);
    }

    const commandsData = commands.map(command => command.toJSON());

    const rest = new REST({
        version: "10"
    }).setToken(process.env.BOT_TOKEN as string);

    const data: any = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.GUILD_ID as string), {
        body: commandsData
    });

    console.log(`Successfully registered ${data.length} commands!`);
})();