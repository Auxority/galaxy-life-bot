import { Client, GatewayIntentBits, Interaction } from 'discord.js';
import Command from './commands/Command.js';
import Util from './util.js';

export class GalaxyBot {
    private static readonly GATEWAY_INTENTS = [GatewayIntentBits.Guilds];
    private static readonly COMMANDS_DIR = "commands";
    private _token: string;
    private _client: Client;
    private _commands: Map<string, Command>;

    public constructor(token: string) {
        this._token = token;
        this._client = new Client({
            intents: GalaxyBot.GATEWAY_INTENTS,
        });
        this._commands = new Map<string, Command>();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this._client.login(this._token);
        await this.loadCommands();
        this._client.on("interactionCreate", (interaction) => {
            this.onInteraction(interaction);
        });
        this._client.once("ready", this.onceReady);
    }

    private async loadCommands(): Promise<void> {
        const files = await Util.getCommandFiles(`./src/${GalaxyBot.COMMANDS_DIR}`);
        console.log(`Loading ${files.length} commands:`);
        
        let i = 0;
        for (const file of files) {
            const commandModule = await import(`./${GalaxyBot.COMMANDS_DIR}/${file}`);
            const newCommand = new commandModule.default();
            console.log(`${i + 1}. ${newCommand.name} command loaded!`);
            this._commands.set(newCommand.name, newCommand);
            i++;
        }
    }

    private async onInteraction(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) {
            return;
        }
        
        const command = this._commands.get(interaction.commandName);
        if (command) {
            command.run(interaction);
        }
    }

    private onceReady(): void {
        console.log("The bot is up and running!");
    }
}