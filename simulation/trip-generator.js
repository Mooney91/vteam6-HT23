const stationHelper = require("./utils").stationHelper;
const SQLiteHelper = require("./utils").SQLiteHelper;

let requestsMade = 0;

// Generate trips for all stations
async function generateTrips() {
    const stations = await stationHelper.getStations();

    // Open connection to SQLite database
    const dbc = SQLiteHelper.getDBConnection();

    for (i = 0; i < stations.length; i++) {
        const currentStation = stations[i];

        for (j = 1; j < stations.length; j++) {
            const nextStation = stations[j];

            if (nextStation.CityID === currentStation.CityID) {
                const origin = currentStation.Location;
                const destination = nextStation.Location;

                await generateTrip(dbc, currentStation.CityID, origin, destination);
            }
        }

        stations.shift();
        i--;
    }

    // Close connection to SQLite database
    SQLiteHelper.closeDBConnection(dbc);
}

// Generate a single trip
async function generateTrip(dbc, cityID, origin, destination) {

    const waypoints = await fetchWaypoints(origin, destination);
    // const waypoints = "test";

    if (waypoints) {
        const trip = [cityID, origin, destination, waypoints.toString()];

        insertTrip(dbc, trip);
    }
}

// Insert a trip into SQLite database   
function insertTrip(dbc, trip) {
    const sql = "INSERT INTO Trip (CityID, Origin, Destination, Waypoints)"
        + "VALUES (?, ?, ?, ?)";

    dbc.run(sql, trip, function(err) {
        if (err) {
            return console.error(err.message);
        }

        console.log(`Rows inserted ${this.changes}`);
    });
}

// Fetch waypoints between origin and destination from API
async function fetchWaypoints(origin, destination) {
    const url = "https://api.openrouteservice.org/v2/directions/cycling-electric"
    const apiKey = "5b3ce3597851110001cf624820729cd7892e4b7488a775715f073283";
    
    const originArr = origin.split(",");
    const destinationArr = destination.split(",");

    const response = await fetch(`${url}?api_key=${apiKey}&start=${originArr[1]},${originArr[0]}&end=${destinationArr[1]},${destinationArr[0]}`);
    
    requestsMade++;

    if (requestsMade % 40 === 0) {
        console.log("Waiting 60 seconds for rate limit to reset.");

        await new Promise(r => setTimeout(r, 60000));
    }

    const obj = await response.json(); // console.log(obj);
    
    const waypoints = obj.features[0].geometry.coordinates;

    switchLatLon(waypoints);

    return waypoints;
}

// Swap the order of lat and lon in coordinates
function switchLatLon(waypoints) {
    for (const waypoint of waypoints) {
        const lat = waypoint[1];
        const lon = waypoint[0];

        waypoint[0] = lat;
        waypoint[1] = lon;
    }
}

generateTrips();