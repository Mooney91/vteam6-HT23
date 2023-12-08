// const fetcher = require("./fetcher");

const BASE_URL = "http://localhost:1337";

const fetcher = {
    // Get all users from database
    async getUsers() {
        const response = await fetch(`${BASE_URL}/v1/user`);

        const users = await response.json();

        return users;
    },

    // Get all available scooters from database
    async getAvailableScooters() {
        const response = await fetch(`${BASE_URL}/v1/scooter/available`);

        const availableScooters = await response.json();

        // console.log(availableScooters);

        return availableScooters;
    },

    // Get all rents from database
    async getRents() {
        const response = await fetch(`${BASE_URL}/v1/rental-log`);

        const rents = await response.json();

        return rents;
    },

    // Create a new RentalLog entry and insert into database
    async createRent(user, scooter) {
        const data = {
            "ScooterID": scooter.ScooterID,
            "UserID": user.UserID,
            "StartTime": helper.getCurrentDateTime(),
            // "EndTime": "2023-01-01T09:30:00",
            "StartStation": scooter.StationID,
            // "EndStation": 2,
            // "Cost": 10.00,
            // "Paid": true
        };

        const response = await fetch(`${BASE_URL}/v1/rental-log`, 
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                // mode: "cors", // no-cors, *cors, same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // redirect: "follow", // manual, *follow, error
                // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

        return response.json(); // parses JSON response into native JavaScript objects
    }
};

const helper = {
    // Get a random integer between min and max (both inclusive)
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },

    // Get current date, time like 2023-01-01T09:00:00
    getCurrentDateTime() {
        const date = new Date();

        // Date
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Time
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds()

        const currentDateTime = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

        // console.log(currentDateTime);
        
        return currentDateTime;
    },

    getActiveUserIDs(simulatedClients) {
        const activeUserIDs = [];

        for (const simCli of simulatedClients) {
            activeUserIDs.push(simCli.user.UserID);
        }

        return activeUserIDs;
    },

    // Get a random available user
    async getRandomAvailableUser(simulatedClients) {
        const users = await fetcher.getUsers();
        const activeUserIDs = this.getActiveUserIDs(simulatedClients);

        if (activeUserIDs.length === users) {
            return;
        }

        let randomAvailableUser = users[this.getRndInteger(0, users.length - 1)];

        while (activeUserIDs.includes(randomAvailableUser.UserID)) {
            randomAvailableUser = users[this.getRndInteger(0, users.length - 1)];
        }

        // console.log(randomAvailableUser);

        return randomAvailableUser;
    },

    // Get a random available scooter
    async getRandomAvailableScooter() {
        const availableScooters = await fetcher.getAvailableScooters();

        const randomAvailableScooter = availableScooters[this.getRndInteger(0, availableScooters.length - 1)];

        // Set status of scooter to in-use

        // console.log(randomAvailableScooter);

        return randomAvailableScooter;
    },

    async rentScooter(user, scooter) {
        fetcher.createRent(user, scooter);
    }
};

module.exports = { helper };
