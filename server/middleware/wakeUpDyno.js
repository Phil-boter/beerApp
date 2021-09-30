// wakeUpDyno is for preventing idling on heroku

const fetch = require("node-fetch");

const wakeUpDyno = (url, interval = 2, callback) => {
    const milliseconds = interval * 60000;
    let today = new Date();

    let time = today.getHours();

    setTimeout(() => {
        console.log("dateTime", time);
        try {
            if (time >= "8" || time <= "22") {
                console.log("dateTime", time);
                console.log(`setTimeout called.`);
                // HTTP GET request to the dyno's url
                fetch(url).then(() =>
                    console.log(`Fetching ${url}. at ${time}`)
                );
            } else {
                // catch fetch errors
                console.log(`Will try again in ${interval} minutes...`);
            }
        } catch (err) {
            // catch fetch errors
            console.log(`Error fetching ${url}: ${err.message} 
            Will try again in ${interval} minutes...`);
        } finally {
            try {
                callback(); // execute callback, if passed
            } catch (e) {
                // catch callback error
                if (callback) {
                    console.log("Callback failed: ", e.message);
                } else {
                    return null;
                }
                // callback ? console.log("Callback failed: ", e.message) : null;
            } finally {
                // do it all again
                return wakeUpDyno(url, interval, callback);
            }
        }
    }, milliseconds);
};

module.exports = wakeUpDyno;
