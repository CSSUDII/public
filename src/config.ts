import yaml from "js-yaml";
import { readFileSync } from "fs";
import { config } from "dotenv";

export class Config {
    private yamlConfig;
    constructor() {}

    private void loadYamlConfig(path: string) {
        try {
            this.yamlConfig = yaml.load(readFileSync('../config.yml', 'utf8'));
        } catch (e) {
            console.error(e);
        }
    }

    private void loadEnv() {}
}