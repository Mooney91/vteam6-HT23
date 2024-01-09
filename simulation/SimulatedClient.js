const publicHelper = require("./utils").publicHelper;

const interval = 1;
let intervalID;

let tripIndex = 0;

let batteryDrainage = 0;

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
            console.log("trip len: ", this.trip.Waypoints.length);
            intervalID = setInterval(() => this.moveScooter(), interval * 1000);
        }
    }

    // Move scooter from one waypoint to another
    moveScooter() {
        // batteryDrainage += 0.05;
        batteryDrainage += 0.5;

        if (batteryDrainage === 1) {
            this.scooter.Battery--;
            batteryDrainage = 0;
        }

        // if (tripIndex === this.trip.Waypoints.length) {
        if (tripIndex === 10) {
            const zero = 0;
            this.scooter.Speed = zero.toFixed(2);

            this.scooter.Location = this.trip.Destination;
    
            // Update scooter in database when trip has ended
            publicHelper.updateScooter(this.scooter);

            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            clearInterval(intervalID);

            this.returnScooter();
        } else {
            this.scooter.Speed = (Math.random() * 30).toFixed(2);

            this.scooter.Location = this.trip.Waypoints[tripIndex];
        
            // Update scooter in database every 5 waypoints
            if (tripIndex % 5 === 0) {
                publicHelper.updateScooter(this.scooter);
            }

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
