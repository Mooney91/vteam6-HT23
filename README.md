# vteam6-H23

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Mooney91/vteam6-HT23/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Mooney91/vteam6-HT23/?branch=main) [![Build Status](https://scrutinizer-ci.com/g/Mooney91/vteam6-HT23/badges/build.png?b=main)](https://scrutinizer-ci.com/g/Mooney91/vteam6-HT23/build-status/main [![system CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/node.js.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/node.js.yml)

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

If you want to test this service individually, then you can execute `docker-compose up admin-interface`; however, it is recommended to run `docker-compose up database server admin-interface` since the `database` and API (`server`) are required  for its functionality.

## customer-interface (Customer Interface)

[![customer-interface CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/customer-interface.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/customer-interface.yml)

The customer can log into the interface and see details of their account, such as travel history and costs. The customer can also put money into their account.

If you want to test this service individually, then you can execute `docker-compose up customer-interface`; however, it is recommended to run `docker-compose up database server customer-interface` since the `database` and API (`server`) are required  for its functionality.

## customer-app (Customer Mobile Application)

[![customer-app CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/customer-app.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/customer-app.yml)

The customer can use this app to rent, use, and lend back a specific scooter.

If you want to test this service individually, then you can execute `docker-compose up customer-app`; however, it is recommended to run `docker-compose up database server customer-app` since the `database` and API (`server`) are required for its functionality.

## simulation (Simulator and Scooter Program/Brain)

[![simulation CI](https://github.com/Mooney91/vteam6-HT23/actions/workflows/simulation.yml/badge.svg)](https://github.com/Mooney91/vteam6-HT23/actions/workflows/simulation.yml)

The simulation emulates the real-life use of the system. If you visit the big map in `admin-interface`, you can see the scooters move around and the users interacting with the system. `simulation` also includes the scooter's internal program.

If you want to test this service individually, then you can execute `docker-compose up simulation`; however, it is recommended to run `docker-compose up database server simulation` since the `database` and API (`server`) are required  for its functionality. `admin-interface` would also be beneficial if you would like to see the simulation in action.
