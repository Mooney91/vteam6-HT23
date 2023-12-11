Man kan se alla städer och cyklar som finns i systemet.
- getCities
- getScooters

Varje stad har ett antal laddstationer där cyklarna kan laddas. Kunden eller servicepersonalen kan förflytta en cykel dit.
- getChargingStations
- moveScooterToChargingStation
    - ScooterID and StationID is needed
    - Scooter is updated to "Parked"
    - ChargingStation adds Scooter to it and the number of scooters is tested against the number of spots

Varje stad har ett antal accepterade platser där cyklar bör parkeras.
- getAllPermittedZones

Cyklar kan även parkeras utanför laddstationer och utanför accepterade platser, men det kan då tillkomma 
en extra avgift för kunden. Detta kallas fri parkering.
- parkScooter
    - updated Scooter to "Parked"
    - add fee to RentalLog
    - getFees (for free parking?)

Man kan se var cyklarna finns parkerade.
- getScooters - filter for parked???

Man kan se hur många (och vilka) cyklar som finns på varje laddstation och accepterad parkeringsplats.
- getAllStations
    - Needs number of places
    - Number of scooters there - their ids
    - Calculation?

Man skall kunna se och hantera kunder i systemet.
- getUsers (etc.)

Varje resa som en kund gör kostar pengar, dels en fast taxa och en rörlig taxa per tidsenhet och en taxa beroende av var de parkerar.
- when rental is create a fee is added
- when the rental is stopped  - a fee is added based on how many minutes 

Om en kund tar en cykel som står på fri parkering - och lämnar på en definierad parkering - så blir startavgiften lite lägre

Man kan få en översikt över laddstationer och cyklar och deras position på en karta.
- getAllStations
- getAllScooters


Initial cost: 10 SEK
Minute cost: 3 SEK
Discount: 5 SEK
Fine: 10 SEK

Remove permittedZone - not needed?