import fs from 'fs';

const saveIPAddress = (req, res, next) => {
    // write time and ip address to file
    const now = new Date();
    const date = now.toISOString();
    const logString = `DATE: ${date} IP: ${req.ip} PATH:${req.url}\n`;
    const path = `${process.env.LOG_PATH}/IP_ADDRESSES.txt`;
    // write the string to the log file
    fs.appendFile(path, logString, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
}

export { saveIPAddress }