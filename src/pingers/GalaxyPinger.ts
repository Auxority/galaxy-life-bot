import fetch from "node-fetch";
import Pinger from "./Pinger.js";

export default class GalaxyPinger extends Pinger {
    private static readonly MASTER_URL = "https://game.galaxylifegame.net/director/getMaster";

    public constructor() {
        super(GalaxyPinger.MASTER_URL);
    }

    public async run(): Promise<void> {
        this.url = await this.getServerUrl();
        await super.run();
    }

    private async getServerUrl(): Promise<string> {
        const res = await fetch(GalaxyPinger.MASTER_URL);
        return await res.text();
    }
}