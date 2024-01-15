const publicHelper = require("./utils").publicHelper;
const SC = require("./SimulatedClient").SimulatedClient;

async function startSimulator() {
    const maxClients = 5;
    const clientInterval = 5; 

    setInterval(() => {
        if (SC.numClients < maxClients) {
            createNewClient();
        }
    }, clientInterval * 1000);
}

async function createNewClient() {
    const user = await publicHelper.getRandomAvailableUser();
    console.log(user);
    
    const scooter = await publicHelper.getRandomAvailableScooter();
    console.log(scooter);

    new SC(user, scooter);
}

startSimulator();

/*
// With a random time interval, simulate a user opening the app and going through the lifecycle
async function startSimulator() {
    // createNewClient();

    // Set a random timer between 1 and 5 seconds
    // const seconds = helper.getRndInteger(1, 5) * 1000;
    const intervalSeconds = 1; 

    const intervalID = setInterval(() => {
        // Clear timeout after timer finishes
        // clearTimeout(timeoutID);

        // Create a new simulated client
        createNewClient();

        if (numClients === 5) {
            clearTimeout(intervalID);
        }
    }, intervalSeconds * 1000);
}

const intervalID = setInterval(() => {
    if (SC.numClients < maxClients) {
        createNewClient();
    }

    createNewClient();

    if (SimulatedClient.numClients === maxClients) {
        clearTimeout(intervalID);
    }
}, intervalSeconds * 1000);

*/

