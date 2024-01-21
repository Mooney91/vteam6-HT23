<script>
//import PrepaidItem from '../components/PrepaidItem.vue';
import MembershipItem from '../components/MembershipItem.vue';
import Cookies from 'js-cookie';

import PaymentMethodItem from '../components/PaymentMethodItem.vue';

export default {
    name: 'PaymentView',

    components: {
        PaymentMethodItem,
        MembershipItem,
    },

    props: {
        backend: String
    },

    data() {
        return {
            user: null,
            userDB: null,
            componentKey: 0,
            formBalance: null,
            formEmail: null,
            formPassword: null,
        }
    },

    async mounted() {
        try {
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const userEmail = userTokenParsed.email;
            this.user = userEmail;
            await this.fetchUser(userEmail);
        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    },

    provide() {
        return {
            backend: 'http://localhost:1337',
            user: this.user,
        }
    },



    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        async changeBalance() {
            try {
                console.log("Changing balance.");
                console.log("ACCOUNT BALANCE: ", this.userDB.AccountBalance);
                console.log("form email", this.formEmail);
                console.log("form password", this.formPassword);
                if (this.formEmail === this.userDB.Email && this.formPassword === this.userDB.Password) {
                    console.log("email & password matches!");
                    const balance = parseFloat(this.userDB.AccountBalance) + parseFloat(this.formBalance);
                    console.log("NEW BALANCE: ", balance);
                    await this.updateUser(balance);
                } else {
                    console.log("email is: ", this.formEmail === this.userDB.Email);
                    console.log("password is: ", this.formPassword === this.userDB.Password);
                    console.log("email & password doesn't match...try again.")
                }
            } catch (error) {
                console.log("Something went wrong when trying to change account balance: ", error);
            }
        },

        async updateUser(newBalance) {
            try {
                const response = await fetch(`${this.backend}/v1/user/${this.userDB.UserID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                    body: JSON.stringify({
                        UserID: this.userDB.UserID,
                        FirstName: this.userDB.FirstName,
                        LastName: this.userDB.LastName,
                        Password: this.userDB.Password,
                        Email: this.userDB.Email,
                        AccountBalance: newBalance,
                        PaymentType: this.userDB.PaymentType,
                        Role: this.userDB.Role
                    }),
                    })
                const result = await response.json();
                console.log("result after PUT fetch: ", result);
                this.userDB.AccountBalance = newBalance;
                return result;
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            } finally {
                this.forceRerender()
            }
        },
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

                this.userDB = {
                    UserID: result[0].UserID,
                    FirstName: result[0].FirstName,
                    LastName: result[0].LastName,
                    Password: result[0].Password,
                    Email: result[0].Email,
                    AccountBalance: result[0].AccountBalance,
                    PaymentType: result[0].PaymentType,
                    Role: result[0].Role
                };
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
    },

}

</script>

<template>
    <div v-if="user" class="payment-details">
        <h1>Payment Details</h1>

        <h3>Charge your prepaid: </h3>
        <h4>You must enter your email and password before changing your prepaid balance.</h4>
        <h4 v-if="userDB">Your current balance is: <strong>{{ userDB.AccountBalance }}</strong></h4>
        <form v-on:submit.prevent="changeBalance" class="prepaid-form">
            <label for="email">Email:</label><br>
            <input type="email" name="email" id="email" required placeholder="enter your email.." v-model="formEmail"/><br>
            <label for="password">Password:</label><br>
            <input type="password" name="password" id="password" required placeholder="enter your password.." v-model="formPassword"/><br>

            <label for="change-balance">Change your balance:</label><br>
            <input type="number" name="change-balance" id="change-balance" required v-model="formBalance"/><br>
            <button type="submit" id="change-submit">Submit changes</button>
        </form><br>

        <PaymentMethodItem /><br>
        <MembershipItem />
    </div>

</template>


<style>

.payment-details {
    padding: 2em;
}

#change-submit {
    padding-right: 1.5em;
    padding-left: 1.5em;
}

</style>

