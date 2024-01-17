const BASE_URL = "http://localhost:1337";
const API_KEY = "n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0"

export class utils {
    /**
     * Get specific user from database
     * @param email The user's email
     * @return A user
     */
    static async getUser(email) {
        try {
            const response = await fetch(`${this.backend}/v1/user/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
            })

            const result = await response.json()
            console.log("Result: ", result)

            return result

        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Get specific user from database
     * @param firstName The user's first name
     * @param lastName The user's last name
     * @param password The user's password
     * @param email The user's email
     * @param paymentType The user's email
     * @param role The user's email
     * @return A message
     */
    static async updateUser(firstName, lastName, password, email, paymentType, role) {
        try {
            const data = {
                'FirstName': firstName,
                'LastName': lastName,
                'Password': password,
                'Email': email,
                'PaymentType': paymentType,
                'Role': role,
            }

            const response = await fetch(`${BASE_URL}/v1/rental-log`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
                body: JSON.stringify(data),
            })

            return response.json()

        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Get all users from database
     * @return Multiple users
     */
    static async getUsers() {
        try {
            const response = await fetch(`${BASE_URL}/v1/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                }
            })

            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Get specific scooter from database
     * @param id The scooter's id
     * @return A scooter
     */
    static async getScooter(id) {
        try {
            const response = await fetch(`${BASE_URL}/v1/scooter/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                }
            })

            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Get all scooters from database. Including unavilable scooters.
     * @returns Multiple scooters
     */
    static async getScooters() {
        try {
            const response = await fetch(`${BASE_URL}/v1/scooter`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                }
            })

            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Get all available scooters from database
     * @returns Multiple scooters
     */
    static async getAvailableScooters() {
        try {
            const response = await fetch(`${BASE_URL}/v1/scooter/available`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                }
            })

            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Create a new RentalLog entry and insert into database
     * @param user A user to create rent for
     * @param scooter A scooter to rent
     * @return A message
     */
    static async createRent(userId, scooterId, stationId = null) {
        const data = {
            "ScooterID": scooterId,
            "UserID": userId,
            "StartTime": helper.getCurrentDateTime(),
            // "EndTime": "2023-01-01T09:30:00",
            "StartStation": stationId,
            // "EndStation": 2,
            // "Cost": 10.00,
            // "Paid": true
        };

        const response = await fetch(`${BASE_URL}/v1/rental-log`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify(data),
        });

        return response.json()
    }

    /**
     * Stop the current rent on the active scooter
     * @param scooter The scooter's id
     * @param endStation The end station's id (optional).
     * @return A message
     */
    static async getScooterRent(scooterId) {
        const response = await fetch(`${BASE_URL}/v1/rental-log/${scooterId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
        })

        return response.json()
    }

    /**
     * Stop the current rent on the active scooter
     * @param scooter The scooter's id
     * @param endStation The end station's id (optional).
     * @return A message
     */
    static async stopScooterRent(scooterId, endStation = null) {
        const data = {
            'EndStation': endStation,
        }

        const response = await fetch(`${BASE_URL}/v1/rental-log/${scooterId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify(data),
        })

        return response.json()
    }
}
