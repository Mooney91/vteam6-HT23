# Run Simulation

* Set up SQLite database (sqlite3 db/trip.sqlt < db/setup.sql)
* Run Trip Generator to populate SQLite database (node trip-generator.js)

# Misc
* Build docker: docker-compose build --no-cache
* access database: docker exec -it vteam6_database mariadb -uroot -pvteam6