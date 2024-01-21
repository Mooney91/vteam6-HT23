const publicHelper = require("./utils").publicHelper;
const SC = require("./SimulatedClient").SimulatedClient;

// Max number of clients at any given time
const maxClients = 500;

// Time (in seconds) between new clients being activated
const clientInterval = 3;

// Time (in seconds) it takes for a scooter to move from one waypoint to another
const waypointInterval = 1;

// Number of waypoints between a scooter's properties being updated in database
const updateInterval = 3;

async function startSimulator() {
    SC.waypointInterval = waypointInterval;
    SC.updateInterval = updateInterval;

    setInterval(() => {
        if (SC.numClients < maxClients) {
            createNewClient();
        }
    }, clientInterval * 1000);
}

async function createNewClient() {
    const user = await publicHelper.getRandomAvailableUser();
    // console.log(user);
    
    const scooter = await publicHelper.getRandomAvailableScooter();
    // console.log(scooter);

    new SC(user, scooter);
}

startSimulator();
