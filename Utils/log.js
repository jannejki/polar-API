import fs from 'fs';

const saveIPAddress = (ipAddress) => {
    // write time and ip address to file
    const now = new Date();
    const date = now.toISOString();
    const logString = `${date}: ${ipAddress}`;

    // write the string to the log file
    fs.appendFile('IP_ADDRESSES.txt', logString, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

export { saveIPAddress }