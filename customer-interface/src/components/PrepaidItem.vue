
<style>

</style>



<template v-if="user">
    <h3>Prepaid Item</h3>
    <h4>You must enter your email and password before changing your prepaid balance.</h4>
    <h4 v-if="user">Your current balance is: <strong>{{ user.AccountBalance }}</strong></h4>
    <form v-on:submit.prevent="changeBalance" class="prepaid-form">
        <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" required placeholder="enter your email.." v-model="formEmail"/><br>
        <label for="password">Password:</label><br>
        <input type="password" name="password" id="password" required placeholder="enter your password.." v-model="formPassword"/><br>

        <label for="change-balance">Change your balance:</label><br>
        <input type="number" name="change-balance" id="change-balance" required /><br>
        <button type="submit">Submit changes</button>
    </form>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: "PrepaidItem",

    inject: ['backend'],

    data() {
        return {
            user: null,
            accountBalance: null,
            formEmail: null,
            formPassword: null,
            changedBalance: null,
        }
    },

    methods: {
        changeBalance() {
            try {
                console.log("Changing balance.");
                console.log("logging the email from form", this.userEmail);
            } catch (error) {
                console.log("Something went wrong when trying to change account balance: ", error);
            }
        },
        async fetchUser(activeUser) {
            try {
                console.log("trying to fetch user data for: ", activeUser);
                console.log("this.backend: ", this.backend);
                const response = await fetch(`${this.backend}/v1/user/email/${activeUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                });
                const result = await response.json();
                console.log("result after fetch: ", result);
                this.user = result[0];
                //this.userID = result[0].UserID;
                //this.accountBalance = result[0].AccountBalance;
                console.log(this.userID);
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
    },

    async mounted() {
        try {
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const user = userTokenParsed.email;
            await this.fetchUser(user);

        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

