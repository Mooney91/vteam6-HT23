const publicHelper = require("./utils").publicHelper;

class SimulatedClient {
    // Track number of clients currently active
    static numClients = 0;

    // Time (in seconds) it takes for a scooter to move from one waypoint to another
    static waypointInterval;

    // Number of waypoints between a scooter's properties being updated in database
    static updateInterval;

    constructor(user, scooter) {
        SimulatedClient.numClients++;

        this.user = user;
        this.scooter = scooter;
        this.rentalLogID = null;
        this.trip = null;

        this.intervalID;
        this.tripIndex = 0;
        this.batteryDrainage = 0;

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

        if (this.scooter.Status != "Free Parking") {
            this.trip = await publicHelper.getRandomMatchingTrip(this.scooter.Location.replace(/\s/g, ""));
        } else {
            this.trip = await publicHelper.generateFreeTrip(this.scooter.Location.replace(/\s/g, ""));
        }

        if (this.trip) {
            this.intervalID = setInterval(() => this.moveScooter(), SimulatedClient.waypointInterval * 1000);
        } else {
            console.log("No trip available.");
        }
    }

    // Move scooter from one waypoint to another
    moveScooter() {
        this.batteryDrainage += 0.05;
        // this.batteryDrainage += 0.5;

        if (this.batteryDrainage === 1) {
            this.scooter.Battery--;
            this.batteryDrainage = 0;
        }

        if (this.tripIndex === this.trip.Waypoints.length) {
        // if (this.tripIndex === 5) {
            const zero = 0;
            this.scooter.Speed = zero.toFixed(2);

            const waypointCoordsString = String(this.trip.Destination)
            this.scooter.Location = waypointCoordsString.replace(/[\[\]']+/g,'');
            // this.scooter.Location = this.trip.Destination;
    
            // Update scooter in database when trip has ended
            publicHelper.updateScooter(this.scooter);

            console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            clearInterval(this.intervalID);

            this.returnScooter();
        } else {
            this.scooter.Speed = (Math.random() * 30).toFixed(2);

            const waypointCoordsString = String(this.trip.Waypoints[this.tripIndex])
            this.scooter.Location = waypointCoordsString.replace(/[\[\]']+/g,'');
            // this.scooter.Location = this.trip.Waypoints[this.tripIndex];
        
            // Update scooter in database every x waypoints
            if (this.tripIndex % SimulatedClient.updateInterval === 0) {

                publicHelper.updateScooter(this.scooter);
            }

            // console.log("Moving scooter to: " + JSON.stringify(this.scooter.Location));

            this.tripIndex++;
        }
    }

    // Return scooter
    async returnScooter() {
        SimulatedClient.numClients--;

        console.log("Returning a scooter!");

        await publicHelper.stopRent(this.rentalLogID, this.user, this.scooter);
    }
}

module.exports = { SimulatedClient };
