const sqlite3 = require('sqlite3').verbose();

const fetchHelper = {
    BASE_URL: "http://localhost:1337",

    async getData(endpoint) {
        const response = await fetch(`${this.BASE_URL}/v1/${endpoint}`);

        const data = await response.json();

        return data;
    },

    async updateData(endpoint, data = null) {
        const response = await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        
        console.log("updateData response: ");
        console.log(response);
        // return response.json();
    },

    async createData(endpoint, data) {
        const response = await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

        console.log("createData response: ");
        console.log(response);
        // return response.json();
    }
};

const rentHelper = {
    async createRent(user, scooter) {
        const data = {
            "ScooterID": scooter.ScooterID,
            "UserID": user.UserID,
            "StartTime": this._getCurrentDateTime(),
            // "EndTime": "2023-01-01T09:30:00",
            "StartStation": scooter.StationID,
            // "EndStation": 2,
            // "Cost": 10.00,
            // "Paid": true
        };

        await fetchHelper.createData("rental-log", data);
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
}

const userHelper = {
    users: [],

    async getUsers() {
        if (this.users.length === 0) {
            this.users = await fetchHelper.getData("user");
        }

        return this.users;
    },

    recycleUser(user) {
        this.users.push(user);
    }
}

const scooterHelper = {
    scooters: [],

    async getScooters() {
        if (this.scooters.length === 0) {
            this.scooters = await fetchHelper.getData("scooter");
        }

        return this.scooters;
    },

    async unparkScooter(scooter) {
        // Update an entry by providing its `id` and `StationID`. PUT /v1/scooter/:id/unpark/:StationID

        const endpoint = `scooter/${scooter.ScooterID}/unpark/${scooter.StationID}`;
 
        await fetchHelper.updateData(endpoint);
    },

    /*
    async parkScooter(scooter) {
        const endpoint = `scooter/${scooter.ScooterID}/park/${scooter.StationID}`;
 
        await fetchHelper.updateData(endpoint);
    },
    */

    recycleScooter(scooter) {
        this.scooters.push(scooter);
    }
}

const SQLiteHelper = {
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

const tripHelper = {
    // Get trips with location either matching origin or destination
    async getMatchingTrips(location) {
        const dbc = SQLiteHelper.getDBConnection();

        const matchingTrips = await this._findTrips(dbc, location);

        SQLiteHelper.closeDBConnection(dbc);

        return matchingTrips;
    },

    // Find trips with location either matching origin or destination
    async _findTrips(dbc, location) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Trip WHERE Origin = ? OR Destination = ?";

            dbc.all(sql, [location, location], (err, row) => {
                if (err) reject(err);

                resolve(row);
            });
        });
    },

    // Convert a string of waypoints to an array
    waypointsStringToArray(wpString) {
        const waypoints = [];

        const wpArr = wpString.split(",");

        for (i = 0; i < wpArr.length; i = i + 2) {
            const waypoint = [wpArr[i], wpArr[i+1]];
            
            waypoints.push(waypoint);
        }

        return waypoints;
    },

    // Reverse the direction of a trip
    reverseTrip(trip) {
        const origin = trip.Origin;

        trip.Origin = trip.Destination;
        trip.Destination = origin;

        trip.Waypoints.reverse();
    }
}

const publicHelper = {
    _getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    async getRandomAvailableUser() {
        const users = await userHelper.getUsers();

        let index = this._getRndInteger(0, users.length - 1);
    
        const user = users.splice(index, 1)[0];
    
        return user;
    },

    async getRandomAvailableScooter() {
        const scooters = await scooterHelper.getScooters();

        let index = this._getRndInteger(0, scooters.length - 1);

        while (scooters[index].Status != "Parked") {
            index = this._getRndInteger(0, scooters.length - 1);
        }
    
        const scooter = scooters.splice(index, 1)[0];
    
        return scooter;
    },

    // Get a trip from SQLite database with location matching either origin or destination
    async getRandomMatchingTrip(location) {
        const matchingTrips = await tripHelper.getMatchingTrips(location);

        if (matchingTrips.length === 0) {
            return;
        }

        const index = this._getRndInteger(0, matchingTrips.length - 1);

        const selectedTrip = matchingTrips[index];

        selectedTrip.Waypoints = tripHelper.waypointsStringToArray(selectedTrip.Waypoints);

        if (location === selectedTrip.Destination) {
            tripHelper.reverseTrip(selectedTrip);
        }

        return selectedTrip;
    },

    async startRent(user, scooter) {
        // 1. Create RentalLog entry (Active?, ScooterID, UserID, StartTime, StartStation) : RentalLogID
        rentHelper.createRent(user, scooter);

        // 2. Update Scooter (ScooterID) | (Status, StationID)
        scooterHelper.unparkScooter(scooter);

        // 3. Update Station (StationID) | (ScooterOccupancy)
    },

    async stopRent(user, scooter) {
        // 1. Calculate cost ((EndTime - StartTime) * price + fee) : cost
        // 2. Charge User (cost) : paid

        // 1. Update RentalLog entry (RentalLogID) | (Active?, EndStation, Cost?, Paid?)
        // 2. Update Scooter (ScooterID) | (Status, Location?, Battery?, StationID)
        // 3. Update Station (StationID) | (ScooterOccupancy)

        // Recycle user
        userHelper.recycleUser(user);

        // Recycle scooter
        scooterHelper.recycleScooter(scooter);
    }
}

module.exports = { publicHelper };
