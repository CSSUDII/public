import fs from "fs";

async loadConfig(yaml, logger) => {
    try {
        await this.config = yaml.load(this.fs.readFileSync('../../config.yml', 'utf8'));
        this.logger.info('Loaded Config File');
    } catch (e) {
        this.logger.error('Error loading Config ' + e);
        this.logger.warn('Using Default Settings');
    };
};

export default loadConfig;
