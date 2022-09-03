import { CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import Command from "./Command.js";
import GalaxyPinger from "../pingers/GalaxyPinger.js";

export default class StatusCommand extends Command {
    protected _name = "status";
    protected _title = "Status";
    protected _description = "Gets the status of the galaxy life servers.";
    private _galaxyPinger: GalaxyPinger;

    public constructor() {
        super();
        this._galaxyPinger = new GalaxyPinger();
    }

    public async run(interaction: CommandInteraction): Promise<void> {
        await this._galaxyPinger.run();

        const row = this.createActionRow();

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

    private createActionRow(): any {
        return new ActionRowBuilder()
            .addComponents(
                this.createGitHubButton()
            );
    }

    private createGitHubButton(): ButtonBuilder {
        return new ButtonBuilder()
            .setLabel("View on GitHub")
            .setStyle(ButtonStyle.Link)
            .setURL("https://github.com/Auxority/galaxy-life-bot");
    }

    private generateDescription(): string {
        return `Ping: ${this.formatNumber(this._galaxyPinger.ping)}ms\nStatus: ${this.statusToMessage()}`;
    }

    private formatNumber(value: number, fractionDigits: number = 0, roundNearest: number = 1): string {
        const power = Math.pow(10, fractionDigits);
        return String(
            Math.round(value * power / roundNearest) / power * roundNearest
        );
    }

    private statusToMessage(): string {
        switch (this._galaxyPinger.serverStatus) {
            case 404:
                return "Online";
            case 504:
                return "Maintenance";
            default:
                return "Offline";
        }
    }
}