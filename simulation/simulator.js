const publicHelper = require("./utils").publicHelper;
const SC = require("./SimulatedClient").SimulatedClient;

// let timeoutID;

// With a random time interval, simulate a user opening the app and going through the lifecycle
async function startSimulator() {
    createNewClient();

    /*
    // Set a random timer between 1 and 5 seconds
    const seconds = helper.getRndInteger(1, 5) * 1000;

    timeoutID = setTimeout(() => {
        // Clear timeout after timer finishes
        clearTimeout(timeoutID);

        // Create a new simulated client
        createNewClient();
    }, seconds);
    */
}

async function createNewClient() {
    const user = await publicHelper.getRandomAvailableUser();
    console.log(user);
    
    const scooter = await publicHelper.getRandomAvailableScooter();
    console.log(scooter);

    new SC(user, scooter);
}

startSimulator();

