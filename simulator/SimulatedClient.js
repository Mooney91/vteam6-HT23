const helper = require("./utils").helper;

const sampleTrip = {
    "origin": {"lat": 50.105827, "lon": 14.415478},
    "destination": {"lat": 50.090438, "lon": 14.368958},
    "waypoints": [
        {"lat": 50.081327, "lon": 14.413480},
        {"lat": 50.079761, "lon": 14.429744},
        {"lat": 50.086951, "lon": 14.420524},
        {"lat": 50.075447, "lon": 14.414101},
        {"lat": 50.086469, "lon": 14.411515}
    ]
};

const interval = 3;

let tripIndex = 0;

let intervalID;

// let distanceTraveled = 0;

// const origin = {"lat": 59.315275, "lon": 18.034132};
// const destination = {"lat": 59.319567, "lon": 18.068220};

/*
function moveScooter(scooter) {
    if (tripIndex === sampleTrip.waypoints.length - 1) {
        scooter.Location = sampleTrip.destination;
        console.log(scooter.Location);

        clearInterval(intervalID);
        returnScooter();
    } else {
        scooter.Location = sampleTrip.waypoints[tripIndex];
        console.log(scooter.Location);
    
        tripIndex++;
    }
}
*/

class SimulatedClient {
    constructor(user) {
        this.user = user;
        this.scooter = null;
        // this.RentalLogID = null;

        // this.origin = {"lat": 59.315275, "lon": 18.034132};
        // this.destination = {"lat": 59.319567, "lon": 18.068220};
        // this.wayPoints = [];

        // this.route

        this.login();
    }

    // Login
    login() {
        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} logging in!`);

        this.rentScooter();
    }

    // Rent scooter
    async rentScooter() {
        const scooter = await helper.getRandomAvailableScooter();
        this.scooter = scooter;
        // console.log(this.scooter);

        // Creates a new RentalLog entry in the database
        // await helper.rentScooter(this.user, scooter);

        // TODO: Set status of rented scooter to 'in-use'
        // TODO: Decrement ScooterOccupancy of Station with ID = Scooter.StationID

        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} renting Scooter with ID ${this.scooter.ScooterID}!`);

        this.useScooter();
    }

    // Use scooter
    useScooter() {
        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} using Scooter with ID ${this.scooter.ScooterID}!`);

        // Temporary?
        this.scooter.Location = sampleTrip.origin;
        console.log("Scooter currently at: " + JSON.stringify(this.scooter.Location));
        // this.scooter.Speed = 10;

        intervalID = setInterval(() => this.moveScooter(), interval * 1000);
    }

    moveScooter() {
        if (tripIndex === sampleTrip.waypoints.length) {
            this.scooter.Location = sampleTrip.destination;
    
            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            clearInterval(intervalID);

            this.returnScooter();
        } else {
            this.scooter.Location = sampleTrip.waypoints[tripIndex];
        
            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            tripIndex++;
        }
    }

    /*
    calculateDistanceTraveled() {
        distanceTraveled = this.scooter.Speed * interval;
        // this.scooter.Speed = helper.getRndInteger(5, 20);
    }

    updateLocation() {

    }
    */

    // Return scooter
    returnScooter() {
        console.log("Returning a scooter!");

        // Edits the current RentalLog entry in the database
        // await helper.returnScooter(this.user, scooter);

        // TODO: Set status of rented scooter to 'in-use'
        // TODO: Decrement ScooterOccupancy of Station where scooter was rented
    }
}

module.exports = { SimulatedClient };
