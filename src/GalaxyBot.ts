import { ActivityType, Client, GatewayIntentBits, Interaction, PresenceUpdateStatus, PresenceStatusData } from 'discord.js';
import Command from './commands/Command.js';
import GalaxyPinger from './pingers/GalaxyPinger.js';
import Util from './util.js';

export class GalaxyBot {
    private static readonly GATEWAY_INTENTS = [GatewayIntentBits.Guilds];
    private static readonly COMMANDS_DIR = "commands";
    private static readonly PINGER_SECONDS_INTERVAL = 10;
    private _token: string;
    private _client: Client;
    private _commands: Map<string, Command>;
    private _galaxyPinger: GalaxyPinger;

    public constructor(token: string) {
        this._token = token;
        this._client = new Client({
            intents: GalaxyBot.GATEWAY_INTENTS,
        });
        this._commands = new Map<string, Command>();
        this._galaxyPinger = new GalaxyPinger();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        this._client.login(this._token);
        await this.loadCommands();
        this.initializeEvents();
        this.runPinger();
    }

    private initializeEvents(): void {
        this._client.on("interactionCreate", (interaction) => {
            this.onInteraction(interaction);
        });
        this._client.once("ready", () => {
            this.onceReady();
        });
    }

    private async runPinger(): Promise<void> {
        setInterval(async () => {
            await this._galaxyPinger.run();
            this.updateStatus();
        }, GalaxyBot.PINGER_SECONDS_INTERVAL * 1000);
    }

    private updateStatus(): void {
        if (!this._client.user) {
            return;
        }

        this._client.user.setPresence({
            status: this.getPresenceStatus(),
            activities: [{
                name: `${this.generateStatus()} - ${this.getStatusEmoji()} Ping: ${Util.formatNumber(this._galaxyPinger.ping)}ms`,
                type: ActivityType.Playing,
            }],
        });
    }

    private getPresenceStatus(): PresenceStatusData {
        switch (this._galaxyPinger.serverStatus) {
            case 404:
                return PresenceUpdateStatus.Online;
            default:
                return PresenceUpdateStatus.DoNotDisturb;
        }
    }

    private getStatusEmoji(): string {
        const currentPing = this._galaxyPinger.ping;
        if (this._galaxyPinger.serverStatus === 404) {
            return currentPing < 200 ? "🟢" : currentPing < 400 ? "🟡" : "🔴";
        }
        return "🔴";
    }

    private generateStatus(): string {
        switch (this._galaxyPinger.serverStatus) {
            case 404:
                return "online";
            default:
                return "offline";
        }
    }

    private async loadCommands(): Promise<void> {
        const files = await Util.getCommandFiles(`./src/${GalaxyBot.COMMANDS_DIR}`);
        console.log(`Loading ${files.length} command(s):`);

        let i = 0;
        for (const file of files) {
            const commandModule = await import(`./${GalaxyBot.COMMANDS_DIR}/${file}`);
            const newCommand = new commandModule.default();
            console.log(`${i + 1}. ${newCommand.name}`);
            this._commands.set(newCommand.name, newCommand);
            i++;
        }
        console.log("Finished loading commands!");
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