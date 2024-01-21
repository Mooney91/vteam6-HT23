const BASE_URL = `${location.protocol}//${location.hostname}:1337`
const API_KEY = "p6jzni39z780u50kd3p0d14sh7uekpby5qpz"

export class utils {
    /**
     * Get specific user from database
     * @param email The user's email
     * @return A user
     */
    static async getUser(email) {
        try {
            const response = await fetch(`${BASE_URL}/v1/user/email/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                },
            })

            const result = await response.json()
            return result[0]

        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Tries to login the specific user
     * @param email The user's email
     * @param password The user's password
     * @return A boolean, whether the user was logged in successfully.
     */
    static async loginUser(email, password) {
        try {
            const user = await this.getUser(email)
            return user.Password == password
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
    static async updateUser(user) {
        try {
            const data = {
                'FirstName': user.FirstName,
                'LastName': user.LastName,
                'Password': user.Password,
                'Email': user.Email,
                'AccountBalance': user.AccountBalance,
                'PaymentType': user.PaymentType,
                'Role': user.Role,
            }

            const response = await fetch(`${BASE_URL}/v1/user/${user.UserID}`,
            {
                method: 'PUT',
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

            const res = await response.json()
            return res[0]
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
            "StartStation": stationId,
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
    }

    /**
     * Stop the current rent on the active scooter
     * @param scooter The scooter's id
     * @param endStation The end station's id (optional).
     * @return A message
     */
    static async getRentDetails(scooterId) {
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
    static async stopRent(scooterId, endStation) {
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
