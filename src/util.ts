import { promises } from 'fs';

export default class Util {
    public static async getCommandFiles(commandsPath: string): Promise<string[]> {
        const rawFiles = await promises.readdir(commandsPath);
        rawFiles.splice(rawFiles.indexOf("Command.ts"), 1);
        return rawFiles.map((file) => file.replace(".ts", ".js"));
    }

    public static formatNumber(value: number, fractionDigits: number = 0, roundNearest: number = 1): string {
        const power = Math.pow(10, fractionDigits);
        return String(
            Math.round(value * power / roundNearest) / power * roundNearest
        );
    }
}