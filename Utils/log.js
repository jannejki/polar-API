import fs from 'fs';

const saveIPAddress = (req, res, next) => {
    // write time and ip address to file
    const now = new Date();
    
    // write time in format: 2021-01-01 00:00:00
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const path = `${process.env.LOG_PATH}/IP_ADDRESSES.txt`;
    const logString = `DATE: ${date} IP: ${req.ip} PATH:${req.url}\r\n`;
    console.log(logString);
    // write the string to the log file
    fs.appendFile(path, logString, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
}

export { saveIPAddress }