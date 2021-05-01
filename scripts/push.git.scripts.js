const { exec } = require("child_process");
const logger = require('inklog.js');

function push() {
    exec('git push', (err, stdout, stderr) => {
        if (err) {
            logger.error(err);
        } else if (stdout) {
            logger.info(stdout);
        } else if (stderr) {
            logger.info(stderr);
        };
    });

    logger.info('Pushing to GitHub')
};

push();
