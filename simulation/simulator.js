const helper = require("./utils").helper;
const SC = require("./SimulatedClient").SimulatedClient;

const simulatedClients = [];

let timeoutID;

// With a random time interval, simulate a user opening the app and going through the lifecycle
function rndIntervalTimer() {
    // Set a random timer between 1 and 5 seconds
    const seconds = helper.getRndInteger(1, 5) * 1000;

    timeoutID = setTimeout(() => {
        // Clear timeout after timer finishes
        clearTimeout(timeoutID);

        // Create a new simulated client
        createNewClient();
    }, seconds);
}

async function createNewClient() {
    // Fetch an available user at random from database
    const user = await helper.getRandomAvailableUser(simulatedClients);

    // If we didn't run out of available users
    if (user) {
        const simCli = new SC(user);

        simulatedClients.push(simCli);

        // sc.simulateLifeCycle();

        // rndIntervalTimer();
    }

    // console.log(simulatedClients);
}

// rndIntervalTimer();

createNewClient();

