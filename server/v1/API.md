# Svenska Elsparkscyklar AB
## A REST API for Scooter Rental (v1)

This documentation will help you get started with the _Svenska Elsparkscyklar AB_ API.

This guide will walk you through each endpoint and explain what can be achieved through using the API. If you have any questions or requests concerning the API, please contact the development team directly.

*Group 6 - Svenska Elsparkscyklar AB*

## Try it

You can try out the pre-populated dataset `City`.

*   [Get all cities.](localhost:1337/v1/city)
*   [Get Malmö with `id=3`](localhost:1337/v1/city/3)

## Contents

* [ActivityType](#activitytype)
* [City](#city)
* [PaymentType](#paymenttype)
* [RentalLog](#rentallog)
* [Scooter](#scooter)
* [ScooterLog](#scooterlog)
* [Station](#station)
* [StationType](#stationtype)
* [User](#user)
* [CostStructure](#coststructure)

## ActivityType

### Attributes
`ActivityType` has the following attributes:
```
ActivityTypeID
ActivityTypeDesc
```

### Get the dataset

Get the full `ActivityType` dataset.

```
GET /v1/activity-type
```

Results:

```json
[
  {
    "ActivityTypeID": 1,
    "ActivityTypeDesc": "Parked"
  },
  {
    "ActivityTypeID": 2,
    "ActivityTypeDesc": "Maintenance"
  },
  {
    "ActivityTypeID": 3,
    "ActivityTypeDesc": "Charging"
  },
  {
    "ActivityTypeID": 4,
    "ActivityTypeDesc": "In use"
  },
  {
    "ActivityTypeID": 5,
    "ActivityTypeDesc": "Free Parking"
  }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/activity-type/:id
```

Results:

```json
[
    {
        "ActivityTypeID": 1,
        "ActivityTypeDesc": "Parked"
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/activity-type
```

Results:

```json
{ "message": "The activity type was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/activity-type/:id
```

Results:

```json
{ "message": "The activity type was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/activity-type/
```

Results:

```json
{ "message": "All activity types were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/activity-type/:id
```

Results:

```json
{ "message": "The activity type was deleted successfully." }
```
## City

### Attributes
`City` has the following attributes:
```
CityID
CityName
CityPosition
```

### Get the dataset

Get the full `City` dataset.

```
GET /v1/city
```

Results:

```json
[
    {
        "CityID": 1,
        "CityName": "Stockholm"
    },
    {
        "CityID": 2,
        "CityName": "Gothenburg"
    },
    {
        "CityID": 3,
        "CityName": "Malmö"
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/city/:id
```

Results:

```json
[
    {
        "CityID": 1,
        "CityName": "Stockholm",
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/city
```

Results:

```json
{ "message": "The city was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/city/:id
```

Results:

```json
{ "message": "The city was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/city/
```

Results:

```json
{ "message": "All cities were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/city/:id
```

Results:

```json
{ "message": "The city was deleted successfully." }
```

## PaymentType

### Attributes
`PaymentType` has the following attributes:
```
PaymentTypeID
PaymentTypeDesc
```

### Get the dataset

Get the full `PaymentType` dataset.

```
GET /v1/payment-type
```

Results:

```json
[
    {
        "PaymentTypeID": 1,
        "PaymentTypeDesc": "Card"
    },
    {
        "PaymentTypeID": 2,
        "PaymentTypeDesc": "Swish"
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/payment-type/:id
```

Results:

```json
[
    {
        "PaymentTypeID": 1,
        "PaymentTypeDesc": "Card"
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/payment-type
```

Results:

```json
{ "message": "The payment type was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/payment-type/:id
```

Results:

```json
{ "message": "The payment type was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/payment-type/
```

Results:

```json
{ "message": "All payment types were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/payment-type/:id
```

Results:

```json
{ "message": "The payment type was deleted successfully." }
```

## PermittedZone

### Attributes
`PermittedZone` has the following attributes:
```
PermittedZoneID
ZoneName
ZoneArea
CityID
```

### Get the dataset

Get the full `PermittedZone` dataset.

```
GET /v1/permitted-zone
```

Results:

```json
[
    {
        "PermittedZoneID": 1,
        "ZoneName": "Södermalm",
        "ZoneArea": "{\"type\": \"Polygon\", \"coordinates\": [[[18.06046, 59.31189], [18.07034, 59.31675], [18.07557, 59.31547], [18.08274, 59.31471], [18.08477, 59.31442], [18.08464, 59.31395], [18.07935, 59.31317], [18.07546, 59.31159], [18.07467, 59.30953], [18.06046, 59.31189]]}",
        "CityID": 1
    },
    {
        "PermittedZoneID": 2,
        "ZoneName": "Kungsholmen",
        "ZoneArea": "{\"type\": \"Polygon\", \"coordinates\": [[[17.98997, 59.32822], [18.01151, 59.32878], [18.01523, 59.32894], [18.01674, 59.32952], [18.02122, 59.32963], [18.02862, 59.32945], [18.02757, 59.32751], [18.02801, 59.32719], [18.02363, 59.32609], [18.01322, 59.32756], [17.98997, 59.32822]]}",
        "CityID": 1
    },
    {
        "PermittedZoneID": 3,
        "ZoneName": "Gamla Stan",
        "ZoneArea": "{\"type\": \"Polygon\", \"coordinates\": [[[18.07084, 59.32533], [18.07799, 59.32429], [18.07975, 59.32512], [18.07975, 59.32611], [18.08183, 59.32633], [18.08432, 59.32591], [18.08425, 59.32532], [18.08362, 59.32457], [18.07923, 59.32438], [18.07885, 59.325], [18.075, 59.32532], [18.07439, 59.32511], [18.07189, 59.325], [18.07117, 59.32532], [18.07084, 59.32533]]}",
        "CityID": 1
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/permitted-zone/:id
```

Results:

```json
[
    {
        "PermittedZoneID": 1,
        "ZoneName": "Södermalm",
        "ZoneArea": "{\"type\": \"Polygon\", \"coordinates\": [[[18.06046, 59.31189], [18.07034, 59.31675], [18.07557, 59.31547], [18.08274, 59.31471], [18.08477, 59.31442], [18.08464, 59.31395], [18.07935, 59.31317], [18.07546, 59.31159], [18.07467, 59.30953], [18.06046, 59.31189]]}",
        "CityID": 1
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/permitted-zone
```

Results:

```json
{ "message": "The permitted zone was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/permitted-zone/:id
```

Results:

```json
{ "message": "The permitted zone was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/permitted-zone/
```

Results:

```json
{ "message": "All permitted zones were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/permitted-zone/:id
```

Results:

```json
{ "message": "The permitted zone was deleted successfully." }
```

## RentalLog

### Attributes
`RentalLog` has the following attributes:
```
RentalLogID
Active
ScooterID
UserID
StartTime
EndTime
StartStation
EndStation
Cost
Paid
```

### Get the dataset

Get the full `RentalLog` dataset.

```
GET /v1/rental-log
```

Results:

```json
[
  {
    "RentalLogID": 1,
    "Active": 1,
    "ScooterID": 179,
    "UserID": 1,
    "StartTime": "2023-12-05T13:45:00.000Z",
    "EndTime": null,
    "StartStation": 15,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  },
  {
    "RentalLogID": 2,
    "Active": 1,
    "ScooterID": 184,
    "UserID": 2,
    "StartTime": "2023-12-06T10:30:00.000Z",
    "EndTime": null,
    "StartStation": 28,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  },
  {
    "RentalLogID": 3,
    "Active": 1,
    "ScooterID": 189,
    "UserID": 3,
    "StartTime": "2023-12-07T15:20:00.000Z",
    "EndTime": null,
    "StartStation": 3,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  },
  {
    "RentalLogID": 4,
    "Active": 1,
    "ScooterID": 194,
    "UserID": 4,
    "StartTime": "2023-12-08T12:15:00.000Z",
    "EndTime": null,
    "StartStation": 11,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  },
  {
    "RentalLogID": 5,
    "Active": 1,
    "ScooterID": 199,
    "UserID": 5,
    "StartTime": "2023-12-09T09:45:00.000Z",
    "EndTime": null,
    "StartStation": 24,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/rental-log/:id
```

Results:

```json
[
  {
    "RentalLogID": 1,
    "Active": 1,
    "ScooterID": 179,
    "UserID": 1,
    "StartTime": "2023-12-05T13:45:00.000Z",
    "EndTime": null,
    "StartStation": 15,
    "EndStation": null,
    "Cost": "10.00",
    "Paid": 0
  }
]
```

### Create a Rental

Add a new entry to the dataset. `ScooterID`, `UserID`, and `StartStation` are required in the `body`, except for its id. If the Scooter is not being collected from a station, the `StationID` must be sent to `null`. A procedure will be called that adds the time, sets the Rental Log status as active, and the Scooter's status as `In use`.

```
POST /v1/rental-log
```

Results:

```json
{ "message": "The rental log was created successfully." }
```

### Update a Rental

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/rental-log/:id
```

Results:

```json
{ "message": "The rental log was updated successfully." }
```

### Stop a Rental

stop a rental by providing its id. The `EndStation` is required in the `body`, even if it is `null`.

```
PATCH /v1/rental-log/:id
```

Results:

```json
{ "message": "The rental log was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/rental-log/
```

Results:

```json
{ "message": "All rental logs were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/rental-log/:id
```

Results:

```json
{ "message": "The rental log was deleted successfully." }
```
## Scooter

### Attributes
`Scooter` has the following attributes:
```
ScooterID
Status
Location
Speed
Battery
StationID
```

### Get the dataset

Get the full `Scooter` dataset.

```
GET /v1/scooter
```

Results:

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

### Get one entry

Get one entry based on its id.

```
GET /v1/scooter/:id
```

Results:

```json
[
    {
        "ScooterID": 1,
        "Status": "Parked",
        "Location": "59.3293, 18.0686",
        "Speed": "0.00",
        "Battery": 61,
        "StationID": 1
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/scooter
```

Results:

```json
{ "message": "The scooter was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/scooter/:id
```

Results:

```json
{ "message": "The scooter was updated successfully." }
```

### Park a Scooter

Update an entry by providing its `id` and `StationID`.

```
PUT /v1/scooter/:id/park/:StationID
```

Results:

```json
{ "message": "The scooter was parked successfully." }
```

### Unpark a Scooter

Update an entry by providing its `id` and `StationID`.

```
PUT /v1/scooter/:id/unpark/:StationID
```

Results:

```json
{ "message": "The scooter was unparked successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/scooter/
```

Results:

```json
{ "message": "All scooters were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/scooter/:id
```

Results:

```json
{ "message": "The scooter was deleted successfully." }
```

## ScooterLog

**PLEASE NOTE THAT SCOOTERLOG IS NOT IN USE IN THIS VERSION.**

### Attributes
`ScooterLog` has the following attributes:
```
ScooterLogID
ScooterID
ActivityType
StartStation
EndStation
```

### Get the dataset

Get the full `ScooterLog` dataset.

```
GET /v1/scooter-log
```

Results:

```json
[
    {
        "ScooterLogID": 1,
        "ScooterID": 1,
        "ActivityType": 1,
        "StartStation": 1,
        "EndStation": 2
    },
    {
        "ScooterLogID": 2,
        "ScooterID": 2,
        "ActivityType": 2,
        "StartStation": 2,
        "EndStation": 3
    },
    {
        "ScooterLogID": 3,
        "ScooterID": 3,
        "ActivityType": 1,
        "StartStation": 3,
        "EndStation": 1
    },
    {
        "ScooterLogID": 4,
        "ScooterID": 4,
        "ActivityType": 3,
        "StartStation": 4,
        "EndStation": 2
    },
    {
        "ScooterLogID": 5,
        "ScooterID": 5,
        "ActivityType": 2,
        "StartStation": 1,
        "EndStation": 3
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/scooter-log/:id
```

Results:

```json
[
    {
        "ScooterLogID": 1,
        "ScooterID": 1,
        "ActivityType": 1,
        "StartStation": 1,
        "EndStation": 2
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/scooter-log
```

Results:

```json
{ "message": "The scooter log was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/scooter-log/:id
```

Results:

```json
{ "message": "The scooter log was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/scooter-log/
```

Results:

```json
{ "message": "All scooter logs were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/scooter-log/:id
```

Results:

```json
{ "message": "The scooter log was deleted successfully." }
```

## Station

### Attributes
`Station` has the following attributes:
```
StationID
StationName
Location
ScooterCapacity
ScooterOccupancy
StationType
CityID
```

### Get the dataset

Get the full `Station` dataset.

```
GET /v1/station
```

Results:

```json
[
    {
        "StationID": 1,
        "StationName": "Central Station",
        "Location": "59.3293,18.0686",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 5,
        "StationType": 1,
        "CityID": 1
    },
    {
        "StationID": 2,
        "StationName": "Sergels Torg",
        "Location": "59.3346,18.0635",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 8,
        "StationType": 2,
        "CityID": 1
    },
    {
        "StationID": 3,
        "StationName": "Gamla Stan",
        "Location": "59.3258,18.0719",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 4,
        "StationType": 1,
        "CityID": 1
    },
    {
        "StationID": 4,
        "StationName": "Södermalm",
        "Location": "59.3154,18.0675",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 6,
        "StationType": 2,
        "CityID": 1
    },
    {
        "StationID": 5,
        "StationName": "Vasastan",
        "Location": "59.3470,18.0487",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 7,
        "StationType": 1,
        "CityID": 1
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/station/:id
```

Results:

```json
[
    {
        "StationID": 1,
        "StationName": "Central Station",
        "Location": "59.3293,18.0686",
        "ScooterCapacity": 10,
        "ScooterOccupancy": 5,
        "StationType": 1,
        "CityID": 1
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/station
```

Results:

```json
{ "message": "The station was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/station/:id
```

Results:

```json
{ "message": "The station was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/station/
```

Results:

```json
{ "message": "All stations were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/station/:id
```

Results:

```json
{ "message": "The station was deleted successfully." }
```

## StationType

### Attributes
`StationType` has the following attributes:
```
StationTypeID
StationTypeDesc
```

### Get the dataset

Get the full `StationType` dataset.

```
GET /v1/station-type
```

Results:

```json
[
    {
        "StationTypeID": 1,
        "StationTypeDesc": "Parking"
    },
    {
        "StationTypeID": 2,
        "StationTypeDesc": "Charging"
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/station-type/:id
```

Results:

```json
[
    {
        "StationTypeID": 1,
        "StationTypeDesc": "Parking"
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/station-type
```

Results:

```json
{ "message": "The station type was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/station-type/:id
```

Results:

```json
{ "message": "The station type was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/station-type/
```

Results:

```json
{ "message": "All station types were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/station-type/:id
```

Results:

```json
{ "message": "The station type was deleted successfully." }
```

## User

### Attributes
`User` has the following attributes:
```
UserID
FirstName
LastName
Password
Email
AccountBalance
PaymentType
```

### Get the dataset

Get the full `User` dataset.

```
GET /v1/user
```

Results:

```json
[
    {
        "UserID": 1,
        "FirstName": "Elsa",
        "LastName": "Andersson",
        "Password": "password1",
        "Email": "elsa@example.com",
        "AccountBalance": 500.00,
        "PaymentType": 1
    },
    {
        "UserID": 2,
        "FirstName": "Oskar",
        "LastName": "Berg",
        "Password": "password2",
        "Email": "oskar@example.com",
        "AccountBalance": 700.00,
        "PaymentType": 2
    },
    {
        "UserID": 3,
        "FirstName": "Maja",
        "LastName": "Carlsson",
        "Password": "password3",
        "Email": "maja@example.com",
        "AccountBalance": 300.00,
        "PaymentType": 1
    },
    {
        "UserID": 4,
        "FirstName": "Erik",
        "LastName": "Dahl",
        "Password": "password4",
        "Email": "erik@example.com",
        "AccountBalance": 900.00,
        "PaymentType": 2
    },
    {
        "UserID": 5,
        "FirstName": "Hanna",
        "LastName": "Eriksson",
        "Password": "password5",
        "Email": "hanna@example.com",
        "AccountBalance": 600.00,
        "PaymentType": 1
    }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/user/:id
```

Results:

```json
[
    {
        "UserID": 1,
        "FirstName": "Elsa",
        "LastName": "Andersson",
        "Password": "password1",
        "Email": "elsa@example.com",
        "AccountBalance": 500.00,
        "PaymentType": 1
    }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/user
```

Results:

```json
{ "message": "The user was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/user/:id
```

Results:

```json
{ "message": "The user was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/user/
```

Results:

```json
{ "message": "All users were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/user/:id
```

Results:

```json
{ "message": "The user was deleted successfully." }
```

## CostStructure

### Attributes
`CostStructure` has the following attributes:
```
CostID
CostDesc
CostAmount
```

### Get the dataset

Get the full `CostStructure` dataset.

```
GET /v1/cost-structure
```

Results:

```json
[
  {
    "CostID": 1,
    "CostDesc": "Fixed",
    "CostAmount": "10.00"
  },
  {
    "CostID": 2,
    "CostDesc": "Time-based",
    "CostAmount": "3.00"
  },
  {
    "CostID": 3,
    "CostDesc": "Fine",
    "CostAmount": "10.00"
  },
  {
    "CostID": 4,
    "CostDesc": "Discount",
    "CostAmount": "-5.00"
  }
]
```

### Get one entry

Get one entry based on its id.

```
GET /v1/cost-structure/:id
```

Results:

```json
[
  {
    "CostID": 1,
    "CostDesc": "Fixed",
    "CostAmount": "10.00"
  }
]
```

### Create a new entry

Add a new entry to the dataset. All attributes are required in the `body`, except for its id.

```
POST /v1/cost-structure
```

Results:

```json
{ "message": "The cost structure was created successfully." }
```

### Update an entry

Update an entry by providing its id. All attributes are required in the `body`, except for the id.

```
PUT /v1/cost-structure/:id
```

Results:

```json
{ "message": "The cost structure was updated successfully." }
```

### Delete all entries

Delete all entries in the dataset.

```
DELETE /v1/cost-structure/
```

Results:

```json
{ "message": "All cost structures were deleted successfully." }
```

### Delete an entry

Delete an entry by its id.

```
DELETE /v1/cost-structure/:id
```

Results:

```json
{ "message": "The cost structure was deleted successfully." }
```
Source
------

The source code for the _Svenska Elsparkscyklar AB_ system can be found on [GitHub](https://github.com/Mooney91/vteam6-HT23).