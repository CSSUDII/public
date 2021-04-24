const { exec } = require("child_process");
const logger = require('inklog.js');

this.args = process.argv;
this.log = logger;

const commitMessage = process.argv.slice(2).join(" ");

if (!commitMessage) {
    return logger.warn('No Commit Message!')
};

function main() {
    exec('git add .');
    exec(`git commit -m "${commitMessage}"`);
    logger.info(`New Commit: ${commitMessage}`)
};

main()

module.exports = main;