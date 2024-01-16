<style>

</style>

<template>
    <h1>All users</h1>
    <div v-if="users">
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
            <template v-for="user in users" :key="user.UserID">
                <tr>
                    <td>{{ user.FirstName }}</td>
                    <td>{{ user.LastName }}</td>
                    <td>{{ user.Password }}</td>
                    <td>{{ user.Email }}</td>
                    <td>{{ user.AccountBalance }}</td>
                    <td>{{ user.PaymentType }}</td>
                    <td>{{ user.Role }}</td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>

export default {
    name: 'AccountView',
    props: {
        backend: String,
    },
    data() {
        return {
            users: null,
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
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0'
                    },
                });
                const result = await response.json();
                console.log("result after fetch: ", result);
                console.log("result after fetch[0]: ", result[0]);

                this.users = result;
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
                const response = await fetch(`${this.backend}/v1/user/${activeUser}`, {
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
    },
    async mounted() {
        try {
            await this.fetchUsers();
        } catch (error) {
            console.error('Error in created lifecycle hook:', error);
        }
    }
};
</script>
