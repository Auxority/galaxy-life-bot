import { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
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

        const row: any = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("View on GitHub")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://github.com/Auxority/galaxy-life-bot")
            );

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("Server status")
                    .setDescription(this.generateDescription())
            ],
            components: [row],
            ephemeral: true
        });
    }

    private generateDescription(): string {
        return `Ping: ${this.formatNumber(this._ping)}ms\nStatus: ${this.statusToMessage()}`;
    }

    private formatNumber(value: number, fractionDigits: number = 0, roundNearest: number = 1): string {
        const power = Math.pow(10, fractionDigits);
        return String(
            Math.round(value * power / roundNearest) / power * roundNearest
        );
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