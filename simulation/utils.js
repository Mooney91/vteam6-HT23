const sqlite3 = require('sqlite3').verbose();

const fetchHelper = {
    BASE_URL: "http://localhost:1337",
    // BASE_URL: "http://vteam6_server:1337",

    async getData(endpoint) {
        const response = await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '0vp11wmhkqns8oiwg4kirbu5e1ytpixfvc0q'
                }
            });
            
        const parsedResponse = await response.json();

        return parsedResponse;
    },
    
    async updateData(endpoint, data) {
        await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '0vp11wmhkqns8oiwg4kirbu5e1ytpixfvc0q'
                },
                body: JSON.stringify(data),
            });
    },

    async createData(endpoint, data) {
        const response = await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '0vp11wmhkqns8oiwg4kirbu5e1ytpixfvc0q'
                },
                body: JSON.stringify(data),
            });

        const parsedResponse = await response.json();

        return parsedResponse;
    },

    async patchData(endpoint, data) {
        await fetch(`${this.BASE_URL}/v1/${endpoint}`,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '0vp11wmhkqns8oiwg4kirbu5e1ytpixfvc0q'
                },
                body: JSON.stringify(data),
            });
    }
};

const rentHelper = {
    async createRent(user, scooter) {
        const data = {
            "ScooterID": scooter.ScooterID,
            "UserID": user.UserID,
            "StartStation": scooter.StationID
        };

        const rentalLogID = await fetchHelper.createData("rental-log", data);

        return rentalLogID;
    },

    async stopRent(rentalLogID, scooter) {
        const data = {
            "EndStation": scooter.StationID,
        };

        await fetchHelper.patchData("rental-log/" + rentalLogID, data);
    }
}

const stationHelper = {
    stations: [],

    async initStations() {
        if (this.stations.length === 0) {
            this.stations = await fetchHelper.getData("station");
        }
    },

    async getStations() {
        await this.initStations();

        return this.stations;
    },

    async getMatchingStation(location) {
        await this.initStations();

        for (i = 0; i < this.stations.length - 1; i++) {
            const station = this.stations[i];

            if (station.Location === location) {
                return station.StationID;
            }
        }
    }
}

const userHelper = {
    users: [],

    async initUsers() {
        if (this.users.length === 0) {
            this.users = await fetchHelper.getData("user");
        }
    },

    async getUsers() {
        await this.initUsers();

        return this.users;
    },

    async recycleUser(user) {
        await this.initUsers();

        this.users.push(user);
    }
}

const scooterHelper = {
    scooters: [],

    async initScooters() {
        if (this.scooters.length === 0) {
            this.scooters = await fetchHelper.getData("scooter");
        }
    },

    async getScooters() {
        await this.initScooters();

        return this.scooters;
    },

    async updateScooter(scooter) {
        const data = {
            "Location": scooter.Location,
            "Speed": scooter.Speed,
            "Battery": scooter.Battery
        };

        const endpoint = `scooter/${scooter.ScooterID}`;

        fetchHelper.updateData(endpoint, data);
    },

    async unparkScooter(scooter) {
        const endpoint = `scooter/${scooter.ScooterID}/unpark/${scooter.StationID}`;

        await fetchHelper.updateData(endpoint);
    },

    async parkScooter(scooter) {
        const endpoint = `scooter/${scooter.ScooterID}/park/${scooter.StationID}`;
 
        await fetchHelper.updateData(endpoint);
    },

    async recycleScooter(scooter) {
        await this.initScooters();

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

    // For testing
    /*
    async getSpecificScooter(id) {
        const scooter = await fetchHelper.getData("scooter/" + id);
    
        return scooter[0];
    },
    */

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
        // Temporary?
        stationHelper.initStations();

        // 1. Create RentalLog entry (Active?, ScooterID, UserID, StartTime, StartStation) : RentalLogID
        const rentalLogID = await rentHelper.createRent(user, scooter);

        // 2. Update Scooter (ScooterID) | (Status, StationID)
        // 3. Update Station (StationID) | (ScooterOccupancy)
        scooterHelper.unparkScooter(scooter);

        return rentalLogID.RentalLogID;
    },

    async updateScooter(scooter) {
        scooterHelper.updateScooter(scooter);
    },

    async stopRent(rentalLogID, user, scooter) {
        // 1. Calculate cost ((EndTime - StartTime) * price + fee) : cost
        // 2. Charge User (cost) : paid

        // 1. Update RentalLog entry (RentalLogID) | (Active?, EndStation, Cost?, Paid?)
        scooter.StationID = await stationHelper.getMatchingStation(scooter.Location);
        rentHelper.stopRent(rentalLogID, scooter);

        // 2. Update Scooter (ScooterID) | (Status, Location?, Battery?, StationID)
        // 3. Update Station (StationID) | (ScooterOccupancy)
        scooterHelper.parkScooter(scooter);

        // Recycle user and scooter
        userHelper.recycleUser(user);
        scooterHelper.recycleScooter(scooter);
    }
}

module.exports = { publicHelper, stationHelper, SQLiteHelper };
