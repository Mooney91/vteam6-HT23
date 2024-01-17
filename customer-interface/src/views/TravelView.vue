
<style>

</style>


<template>
    <div v-if="rentals">
        <h1>Travel History for: {{ user.FirstName }} {{ user.LastName }}</h1><br>
        <table>
            <tr>
                <th>Rental log ID</th>
                <th>Scooter ID</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Start Station</th>
                <th>End Station</th>
                <th>Cost</th>
                <th>Paid</th>
            </tr>
            <template v-for="rental in rentals" :key="rental.RentalLogID">
                <tr>
                    <td>{{ rental.RentalLogID }}</td>
                    <td>{{ rental.ScooterID }}</td>
                    <td>{{ rental.StartTime }}</td>
                    <td>{{ rental.EndTime }}</td>
                    <td>{{ rental.StartStation }}</td>
                    <td>{{ rental.EndStation }}</td>
                    <td>{{ rental.Cost }}</td>
                    <td>{{ rental.Paid }}</td>
                </tr>
            </template>
        </table>
    </div>
</template>


<script>
import Cookies from 'js-cookie';

export default {
    name: 'TravelView',
    props: {
        backend: String,
    },
    data() {
        return {
            user: null,
            userID: null,
            rentals: null,
            items: [],
        }
    },
    methods: {
        async fetchUser(activeUser) {
            try {
                console.log("trying to fetch user data for: ", activeUser);
                const response = await fetch(`${this.backend}/v1/user/email/${activeUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                });
                const result = await response.json();
                console.log("result after fetch: ", result);
                this.user = result[0];
                this.userID = result[0].UserID;
                console.log(this.userID);
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
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
        },
    },
    async mounted() {
        try {
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const user = userTokenParsed.email;
            console.log("user before passed as argument", user);
            await this.fetchUser(user);
            await this.fetchRentals(this.userID);
        } catch (error) {
            console.error('Error in created lifecycle hook:', error);
        }
    }
};

</script>
