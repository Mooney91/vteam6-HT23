* Kunden kan hyra en specifik cykel.
* Under hyr-tiden kan kunden köra cykeln.
* Kunden lämnar tillbaka cykeln
* (EXTRA) Visa en kartbild där alla laddstationer, accepterade parkeringsplatser finns.
* (EXTRA) Visa en kartbild där alla lediga cyklar finns.

https://github.com/Mooney91/vteam6-HT23/blob/development/server/v1/API.md

## TODO

* Add logic and connections to the endpoints!!
* Get user details.

* Show free scooters on the map
* Show free stations or accepted stations

## JavaScript

```js
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

app.use(createPinia())

app.use(
    createAuth0({
        domain: "dev-yl46b5m8hfqpht5q.us.auth0.com",
        clientId: "sD3sE4NcrhKampbYzR0wzpf3spojmDx5",
        authorizationParams: {
            redirect_uri: "http://localhost:1339/authCallback"
        }
    })
);
```

```js
import Cookies from 'js-cookie';
```

```js
async fetchUser(activeUser) {
    try {
        console.log("trying to fetch user data.");
        const response = await fetch(`${this.backend}/v1/user/${activeUser}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
            },
        });
        const result = await response.json();
        console.log("result after fetch: ", result);
        this.user = result[0];
        console.log(this.user);
        return result;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
},
},
```

```js
async fetchRentals(userID) {
    try {
        console.log("trying to fetch rental data for userID: ", userID);
        const response = await fetch(`${this.backend}/v1/rental-log/${userID}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
            },
        });
        const result = await response.json();
        console.log("result after fetch: ", result);
        this.rentals = result;
        console.log(this.userID);
        return result;
    } catch (error) {
        console.error('Error fetching rental data:', error);
        throw error;
    }
}
```

## Scooter Data

```json
[
  {
    "ScooterID": 1,
    "Status": "Parked",
    "Location": "59.3293, 18.0686",
    "Speed": "0.00",
    "Battery": 61,
    "StationID": 1
  },
  {
    "ScooterID": 2,
    "Status": "Parked",
    "Location": "59.3293, 18.0686",
    "Speed": "0.00",
    "Battery": 55,
    "StationID": 1
  },
  {
    "ScooterID": 3,
    "Status": "Parked",
    "Location": "59.3293, 18.0686",
    "Speed": "0.00",
    "Battery": 18,
    "StationID": 1
  },
  {
    "ScooterID": 4,
    "Status": "Parked",
    "Location": "59.3293, 18.0686",
    "Speed": "0.00",
    "Battery": 45,
    "StationID": 1
  },
  {
    "ScooterID": 5,
    "Status": "Parked",
    "Location": "59.3293, 18.0686",
    "Speed": "0.00",
    "Battery": 41,
    "StationID": 1
  }
]
```
