const helper = require("./utils").helper;

class SimulatedClient {
    constructor(user) {
        this.user = user;
        this.scooter = null;
    }

    myBoundMethod = function (sProperty) {
        console.log(arguments.length > 0 ? this[sProperty] : this);
    }.bind(myArray);

    async simulateLifeCycle() {
        setTimeout(this.login, 1000);
        
        // this.login();
        
    }

    // Login
    login() {
        console.log("Logging in!");

        // setTimeout(this.useScooter, 2000);

        /*
        setTimeout(function () {
            rentScooter();
        }, 2000);
        */

        setTimeout(this.rentScooter.bind(this), 2000);
    }

    // Rent scooter
    rentScooter() {
        console.log("Renting a scooter!");

        // const scooter = await helper.getRandomAvailableScooter();

        // Creates a new RentalLog entry in the database
        // await helper.rentScooter(this.user, scooter);

        // Sets client's scooter property
        // this.scooter = scooter;

        setTimeout(this.useScooter, 3000);
    }

    // Use scooter
    useScooter() {
        console.log("Using a scooter!");

        // Generate a trip

        // Simulate movement

        setTimeout(this.returnScooter, 4000);
    }

    // Return scooter
    returnScooter() {
        console.log("Returning a scooter!");
    }
}

module.exports = { SimulatedClient };
