const helper = require("./utils").helper;
const tripFinder = require("./utils").tripFinder;

const interval = 3;
let intervalID;

let tripIndex = 0;

class SimulatedClient {
    constructor(user) {
        this.user = user;
        this.scooter = null;
        this.trip = null;

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

        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} renting Scooter with ID ${this.scooter.ScooterID}!`);

        this.useScooter();
    }

    // Use scooter
    async useScooter() {
        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} using Scooter with ID ${this.scooter.ScooterID}!`);

        this.trip = await tripFinder.getRandomTrip(this.scooter.Location);

        console.log("Scooter currently at: " + JSON.stringify(this.scooter.Location));

        if (this.trip) {
            intervalID = setInterval(() => this.moveScooter(), interval * 1000);
        }
    }

    // Move scooter through all its waypoints to destination
    moveScooter() {
        if (tripIndex === this.trip.Waypoints.length) {
            this.scooter.Location = this.trip.Destination;
    
            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            clearInterval(intervalID);

            this.returnScooter();
        } else {
            this.scooter.Location = this.trip.Waypoints[tripIndex];
        
            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            tripIndex++;
        }
    }

    // Return scooter
    returnScooter() {
        console.log("Returning a scooter!");
    }
}

module.exports = { SimulatedClient };
