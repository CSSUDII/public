function push() {
    exec('git push', (err, stdout, stderr) => {
        if (err) {
            logger.error(err);
        } else if (stdout) {
            logger.debug(stdout);
        } else if (stderr) {
            logger.debug(stderr);
        };
    });

    logger.info('Pushed to GitHub')
};

push();