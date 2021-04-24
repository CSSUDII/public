const { exec } = require('child_process')
const fs = require('fs')
const log = require('inklog.js')

if (process.platform === 'darwin') {
    exec('touch config/db.config.yml');

    fs.writeFile('config/db.config.yml', `url: 'put your mongoDB URL here'`, function(err) {
        if (err) return console.log(err);
        log.info('Edit config/db.config.yml and put in your mongoDB URL');
    });
} else if (process.platform === 'win32') {
    exec(`echo url: 'put your mongoDB URL here' > config/db.config.yml`)
} else if (process.platform === 'linux') {
    exec('touch config/db.config.yml');

    fs.writeFile('config/db.config.yml', `url: 'put your mongoDB URL here'`, function(err) {
        if (err) return console.log(err);
        log.info('Edit config/db.config.yml and put in your mongoDB URL');
    });
} else {
    log.warn(`Your OS: ${process.platform}, This Script Can\'t make a db Config File your your platform, Please make a file under the config dir named db.config.yml, and put: url: 'your mongodb url'   in the config file`)
};