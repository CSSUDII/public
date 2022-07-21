import { Client } from "../../client/Client";

export function getClient() {
    return Client.getInstance();
}
