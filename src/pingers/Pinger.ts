import fetch from "node-fetch";

export default class Pinger {
    private _url: string;
    private _start: number;
    private _ping: number;
    private _serverStatus: number;

    public constructor(url: string) {
        this._url = url;
        this._start = 0;
        this._ping = -1;
        this._serverStatus = -1;
    }

    public async run(): Promise<void> {
        await this.updatePing();
    }

    public get ping(): number {
        return this._ping;
    }

    public get serverStatus(): number {
        return this._serverStatus;
    }

    public get url(): string {
        return this._url;
    }

    public set url(url: string) {
        this._url = url;
    }

    private async updatePing(): Promise<void> {
        this._start = performance.now();
        await this.updateServerStatus();
        this._ping = performance.now() - this._start;
    }

    private async updateServerStatus(): Promise<void> {
        const res = await fetch(this._url);
        this._serverStatus = res.status;
    }
}