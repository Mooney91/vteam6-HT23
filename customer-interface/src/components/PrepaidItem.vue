
<style>

</style>



<template v-if="user">
    <h3>Prepaid Item</h3>
    <h4>You must enter your email and password before changing your prepaid balance.</h4>
    <form v-on:submit.prevent="changeBalance" class="prepaid-form">
        <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" required placeholder="enter your email.." v-model="userEmail"/><br>
        <label for="password">Password:</label><br>
        <input type="password" name="password" id="password" required placeholder="enter your password.." v-model="userPassword"/><br>

        <label for="change-balance">Change your balance:</label><br>
        <input type="number" name="change-balance" id="change-balance" required /><br>
        <button type="submit">Submit changes</button>
    </form>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: "PrepaidItem",
    props: {
        backend: String,
    },

    data() {
        return {
            user: null,
            userEmail: null,
            userPassword: null,
            changedBalance: null
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
        }
    },

    async mounted() {
        try {
            const userCookie = Cookies.get('token');
            const user = JSON.parse(userCookie);
            this.user = user;

        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

