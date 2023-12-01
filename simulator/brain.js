const SC = require("./SimulatedClient").SimulatedClient;

const userData = [
    {"UserID":1,"FirstName":"Elsa","LastName":"Andersson","Password":"password1","Email":"elsa@example.com","AccountBalance":"500.00","PaymentType":1},
    {"UserID":2,"FirstName":"Oskar","LastName":"Berg","Password":"password2","Email":"oskar@example.com","AccountBalance":"700.00","PaymentType":2},
    {"UserID":3,"FirstName":"Maja","LastName":"Carlsson","Password":"password3","Email":"maja@example.com","AccountBalance":"300.00","PaymentType":1},
    {"UserID":4,"FirstName":"Erik","LastName":"Dahl","Password":"password4","Email":"erik@example.com","AccountBalance":"900.00","PaymentType":2},
    {"UserID":5,"FirstName":"Hanna","LastName":"Eriksson","Password":"password5","Email":"hanna@example.com","AccountBalance":"600.00","PaymentType":1}
];

/*
async function test() {
    const users = await fetcher.getUsers();
    console.log(users);
}
*/

// test();

let sc1 = new SC(userData[0]);
sc1.simulateLifeCycle();

