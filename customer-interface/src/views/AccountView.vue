<style>

</style>

<!--
1. Kunden kan logga in på en webbplats och se detaljer om sitt konto.
-->

<template>
    <!--<div v-if="isAuthenticated">-->
    <h3>Account View</h3>
    <div v-if="user">
        <h3>Welcome {{ user.FirstName }} {{ user.LastName }}!</h3><br>
        <table>
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Password</th>
                <th>Email</th>
                <th>AccountBalance</th>
                <th>PaymentType</th>
                <th>Role</th>
            </tr>
            <tr>
                <td>{{ user.FirstName }}</td>
                <td>{{ user.LastName }}</td>
                <td>{{ user.Password }}</td>
                <td>{{ user.Email }}</td>
                <td>{{ user.AccountBalance }}</td>
                <td>{{ user.PaymentType }}</td>
                <td>{{ user.Role }}</td>
            </tr>
        </table>
    </div>
    <!--</div>-->
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'AccountView',
    props: {
        backend: String,
    },
    data() {
        return {
            user: null,
            items: [],
        }
    },
    methods: {
        async fetchUsers() {
            try {
                console.log("trying to fetch user data.");
                console.log(this.backend);
                const response = await fetch(`${this.backend}/v1/user/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                        'Access-Control-Allow-Origin': '*'
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
        async fetchUser(activeUser) {
            try {
                console.log("trying to fetch user data.");
                const response = await fetch(`${this.backend}/v1/user/email/${activeUser}`, {
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
        /*
        async fetchUser(activeUser) {
            try {
                const response = await fetch(`${this.backend}/v1/user/${activeUser}`);
                const result = await response.json();

                this.user = result[0];
                console.log(this.user)
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
        async fetchUserNew(activeUser) {
            const url = "https://api.openrouteservice.org/v1/user"
            const apiKey = "5b3ce3597851110001cf624820729cd7892e4b7488a775715f073283";
            
            const response = await fetch(`${url}/${activeUser}?api_key=${apiKey}`);
            console.log("new type of fetch", response);
            return response;
        }
        */
    },
    async mounted() {
        try {
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const user = userTokenParsed.email;
            console.log("user before passed as argument", user);
            await this.fetchUser(user);
        } catch (error) {
            console.error('Error in created lifecycle hook:', error);
        }
    }
};
</script>


<!--
FRÅN DATABASEN:

INSERT INTO `User` (`FirstName`, `LastName`, `Password`, `Email`, `AccountBalance`, `PaymentType`, `Role`) VALUES
    ('admin', 'admin', 'admin1', 'admn@svenskaelspark.se', 1500.00, 1, 'Admin'),
    ('Elsa', 'Andersson', 'pass123', 'elsa.andersson@email.com', 1500.00, 1, 'Customer'),
    ('Oscar', 'Berggren', 'password456', 'oscar.berggren@email.com', 2000.50, 2, 'Customer'),
    ('Anna', 'Carlsson', 'securepass', 'anna.carlsson@email.com', 1200.75, 1, 'Customer'),
    ('David', 'Dahl', 'davidpass', 'david.dahl@email.com', 800.00, 2, 'Customer'),
-->
