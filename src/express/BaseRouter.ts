import { Client } from "../client/Client";

export class BaseRouter {
    public client: Client;

    public constructor(client: Client) {
        this.client = client;
    }
}
