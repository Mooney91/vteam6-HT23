# vteam6-H23

This is the Git-repository for group 6 (Autumn semester - 2023) in the course *vteam* (*Software Development in Virtual Teams*) at Blekinge Tekniska Högskola. This course aims to develop skills and knowledge within software development whilst working in a mixed team of campus and distance students. This project develops a system for an imagined company *Svenska Elsparkcyklar AB* to handle the rental of electric scooters in Swedish cities.

This system is comprised of a database, an API (server), three interfaces/apps, and a simulator/scooter brain. You can test and run this system by executing `docker-compose up`

## Database

[![database CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/database.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/database.yml)

This is a MariaDB database called `vteam`. It comprises of the following tables:
- `Scooter`;
- `City`;
- `Station`;
- `PermittedZone`;
- `User`;
- `RentalLog`;
- `PaymentType`;
- `StationType`;
- `ActivityType`;
- `CostStructure`;

You can run this service individually by executing `docker-compose up database`.

## Server

[![server CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/server.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/server.yml) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This is the system's API. The current version is v1 and documentation can be found in the `server/v1` directory. 

You can run this service individually by executing `docker-compose up database server`. The database for the server/API to function.

## admin-interface (Administrative Interface)

[![admin-interface CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/admin-interface.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/admin-interface.yml)

`admin-interface` is the administrative interface or admin panel for the system. You can view all the scooters and charging/parking stations as well as update data here.

If you want to test this service individually, then you can execute `docker-compose up admin-interface`; however, it is recommended to run `docker-compose up database server admin-interface` since the `database` and API (`server`) for its functionality.

## customer-interface (Customer Interface)

## customer-app (Customer Mobile Application)

## Simulator (Simulator and Scooter Program/Brain)
