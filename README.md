# vteam6-H23

This is the Git-repository for group 6 (Autumn semester - 2023) in the course *vteam* (*Software Development in Virtual Teams*) at Blekinge Tekniska Högskola. This course aims to develop skills and knowledge within software development whilst working in a mixed team of campus and distance students. This project develops a system for an imagined company *Svenska Elsparkcyklar AB* to handle the rental of electric scooters in Swedish cities.

This system is comprised of a database, an API (server), three interfaces/apps, and a simulator/scooter brain. You can test and run this sytem by executing `docker-compose up`

## Database

## Server

## admin-interface (Administrative Interface)

`admin-interface` is the administrative interface or admin panel for the system. You can view all the scooters and charging/parking stations as well as update data here.

If you want to test this service individually, then you can execute `docker-compose up admin-interface`; however, it is recommended to run `docker-compose up database server admin-interface` since the `database` and API (`server`) for its functionality.

## customer-interface (Customer Interface)

## customer-app

## Simulator
