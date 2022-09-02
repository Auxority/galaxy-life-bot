import { promises } from 'fs';

export default class Util {
    public static async getCommandFiles(commandsPath: string): Promise<string[]> {
        const rawFiles = await promises.readdir(commandsPath);
        rawFiles.splice(rawFiles.indexOf("Command.ts"), 1);
        return rawFiles.map((file) => file.replace(".ts", ".js"));
    }
}