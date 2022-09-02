import { CommandInteraction } from 'discord.js';

export default abstract class Command {
    protected abstract _name: string;
    protected abstract _title: string;
    protected abstract _description: string;

    public constructor() {
        
    }

    public abstract run(interaction: CommandInteraction): void;

    public get title(): string {
        return this._title;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }
}