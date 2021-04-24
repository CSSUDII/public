const { exec } = require("child_process");
const logger = require('inklog.js');

this.args = process.argv;
this.log = logger;

if (!this.args) {
    return logger.warn('No Commit Message!')
};

const commitMessage = process.argv.slice(2).join(" ");

function main() {
    exec('git add .');
    exec(`git commit -m "${commitMessage}"`);
    logger.info('Commied new Commit')
};

main()

module.exports = main;