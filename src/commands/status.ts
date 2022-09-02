import { CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import fetch from "node-fetch";
import Command from "./Command.js";

export default class StatusCommand extends Command {
    protected _name = "status";
    protected _title = "Status";
    protected _description = "Gets the status of the galaxy life servers.";

    private static readonly MASTER_URL = "https://game.galaxylifegame.net/director/getMaster";
    private _start: number;
    private _ping: number;
    private _serverUrl: string;
    private _serverStatus: number;

    public constructor() {
        super();
        this._start = 0;
        this._ping = -1;
        this._serverUrl = "";
        this._serverStatus = -1;
    }

    public async run(interaction: CommandInteraction): Promise<void> {
        await this.updatePing();

        const button = new ButtonBuilder()
            .setCustomId("primary")
            .setLabel("View on GitHub")
            .setStyle(ButtonStyle.Primary)
            .setURL("https://github.com/Auxority/galaxy-life-bot");

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Server status")
                    .setDescription(this.generateDescription())
            ],
            ephemeral: true
        });
    }

    private generateDescription(): string {
        return `Ping: ${this._ping}ms\nStatus: ${this.statusToMessage()}`;
    }

    private statusToMessage(): string {
        if (this._serverStatus === 200) {
            return "Online";
        } else if (this._serverStatus === 504) {
            return "Maintenance";
        }
        return "Offline";
    }

    private async updatePing(): Promise<void> {
        this._serverUrl = await this.getServerUrl();
        this._start = performance.now();
        await this.updateServerStatus();
        this._ping = performance.now() - this._start;
    }

    private async updateServerStatus(): Promise<void> {
        const res = await fetch(this._serverUrl);
        this._serverStatus = res.status;
    }

    private async getServerUrl(): Promise<string> {
        const res = await fetch(StatusCommand.MASTER_URL);
        return await res.text();
    }
}