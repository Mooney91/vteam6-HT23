const BASE_URL = "http://localhost:1337";

const sqlite3 = require('sqlite3').verbose();

const fetcher = {
    async _getData(endpoint) {
        const response = await fetch(`${BASE_URL}/v1/${endpoint}`);

        const data = await response.json();

        return data;
    },

    // Create a new RentalLog entry and insert into database
    async _createRent(user, scooter) {
        const data = {
            "ScooterID": scooter.ScooterID,
            "UserID": user.UserID,
            "StartTime": internal._getCurrentDateTime(),
            // "EndTime": "2023-01-01T09:30:00",
            "StartStation": scooter.StationID,
            // "EndStation": 2,
            // "Cost": 10.00,
            // "Paid": true
        };

        const response = await fetch(`${BASE_URL}/v1/rental-log`, 
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: "cors", // no-cors, *cors, same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // redirect: "follow", // manual, *follow, error
                // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

        return response.json(); // parses JSON response into native JavaScript objects
    },

    // Get current date, time like 2023-01-01T09:00:00
    _getCurrentDateTime() {
        const date = new Date();

        // Date
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Time
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds()

        const currentDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
       
        return currentDateTime;
    }
};

const helper = {
    // Get a random integer between min and max (both inclusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    async getAllStations() {
        const stations = await fetcher._getData("station");

        return stations;
    },

    // Get a random available user
    async getRandomAvailableUser(simulatedClients) {
        const users = await fetcher._getData("user");

        const activeUserIDs = this._getActiveUserIDs(simulatedClients);

        if (activeUserIDs.length === users) {
            return;
        }

        let randomAvailableUser = users[this.getRndInteger(0, users.length - 1)];

        while (activeUserIDs.includes(randomAvailableUser.UserID)) {
            randomAvailableUser = users[this.getRndInteger(0, users.length - 1)];
        }

        return randomAvailableUser;
    },

    // Create an array of active user IDs from simulatedClients
    _getActiveUserIDs(simulatedClients) {
        const activeUserIDs = [];

        for (const simCli of simulatedClients) {
            activeUserIDs.push(simCli.user.UserID);
        }

        return activeUserIDs;
    },

    // Get a random available scooter
    async getRandomAvailableScooter() {
        const availableScooters = await fetcher._getData("scooter/available");

        const randomAvailableScooter = availableScooters[this.getRndInteger(0, availableScooters.length - 1)];

        return randomAvailableScooter;
    }
};

const SQLiter = {
    // Get connection to SQLite database
    getDBConnection() {
        dbc = new sqlite3.Database('./db/trip.sqlt', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
            }

            console.log('Connection opened.');
        });

        return dbc;
    },

    // Close connection to SQLite database
    closeDBConnection(dbc) {
        dbc.close((err) => {
            if (err) {
              console.error(err.message);
            }

            console.log('Connection closed.');
        });
    }
};

const tripFinder = {
    // Get a random trip with location either matching origin or destination
    async getRandomTrip(location) {
        const dbc = SQLiter.getDBConnection();

        const matchingTrips = await this._findTrips(dbc, location);

        SQLiter.closeDBConnection(dbc);

        const selectedTrip = matchingTrips[0];

        if (selectedTrip) {
            selectedTrip.Waypoints = this._wpStringToArray(selectedTrip.Waypoints);
        }

        return selectedTrip;
    },

    // Find trips with location either matching origin or destination
    async _findTrips(dbc, location) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Trip WHERE ORIGIN = ?";

            dbc.all(sql, location, (err, row) => {
                if (err) reject(err);

                resolve(row);
            });
        });
    },

    // Convert a string of waypoints to an array
    _wpStringToArray(wpString) {
        const waypoints = [];

        const wpArr = wpString.split(",");

        for (i = 0; i < wpArr.length; i = i + 2) {
            const waypoint = [wpArr[i], wpArr[i+1]];
            
            waypoints.push(waypoint);
        }

        return waypoints;
    }
}

module.exports = { helper, SQLiter, tripFinder };
