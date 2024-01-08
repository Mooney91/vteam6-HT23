const publicHelper = require("./utils").publicHelper;

const interval = 1;
let intervalID;

let tripIndex = 0;

class SimulatedClient {
    constructor(user, scooter) {
        this.user = user;
        this.scooter = scooter;
        this.rentalLogID = null;
        this.trip = null;

        this.rentScooter();
    }

    // Rent scooter
    async rentScooter() {
        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} renting Scooter with ID ${this.scooter.ScooterID}!`);

        this.rentalLogID = await publicHelper.startRent(this.user, this.scooter);

        this.useScooter();
    }

    // Use scooter
    async useScooter() {
        console.log(`User ${this.user.FirstName} with ID ${this.user.UserID} using Scooter with ID ${this.scooter.ScooterID}!`);

        this.trip = await publicHelper.getRandomMatchingTrip(this.scooter.Location.replace(/\s/g, ""));

        if (this.trip) {
            intervalID = setInterval(() => this.moveScooter(), interval * 1000);
        }
    }

    // Move scooter through all its waypoints to destination
    moveScooter() {
        // if (tripIndex === this.trip.Waypoints.length) {
        if (tripIndex === 5) {
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

    updateScooterLocation() {
        // Update scooter location in database / web sockets
    }

    // Return scooter
    returnScooter() {
        console.log("Returning a scooter!");

        publicHelper.stopRent(this.rentalLogID, this.user, this.scooter);
    }
}

module.exports = { SimulatedClient };
