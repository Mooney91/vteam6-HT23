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

export default {
    name: "PrepaidItem",

    inject: ['backend', 'user', 'userDB'],

    data() {
        return {
            componentKey: 0,
            changedBalance: null,
            formEmail: null,
            formPassword: null,
        }
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        changeBalance() {
            try {
                console.log("userDB from nested component: ", this.userDB);
                console.log("ACCOUNT BALANCE: ", this.userDB.AccountBalance);
                console.log("Changing balance.");
                console.log("form email", this.userDB.formEmail);
                console.log("form password", this.userDB.formPassword);
                if(this.userDB.formEmail === this.userDB.Email && this.userDB.formPassword === this.userDB.Password){
                    console.log("email & password matches!");
                }else {
                    console.log("email is: ", this.userDB.formEmail === this.userDB.Email);
                    console.log("password is: ", this.userDB.formPassword === this.userDB.Password);
                    console.log("email & password doesn't match...try again.")
                }
                // IF OK -> await this.updateUser();
                // (check both email and password)

            } catch (error) {
                console.log("Something went wrong when trying to change account balance: ", error);
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
                console.log("result[0].FirstName", result[0].FirstName);
                // Saving values
                console.log("SAVING VALUES");
                /*
                this.user = result[0];
                console.log(this.user);
                */
                /*
                this.UserID = result[0].UserID;
                console.log(this.UserID);

                this.FirstName = result[0].FirstName;
                console.log(this.FirstName);

                this.LastName = result[0].LastName;
                console.log(this.LastName);

                this.Password = result[0].Password;
                console.log(this.Password);

                this.Email = result[0].Email;
                console.log(this.Email);

                this.AccountBalance = result[0].AccountBalance;
                console.log(this.AccountBalance);

                this.PaymentType = result[0].PaymentType;
                console.log(this.PaymentType);

                this.Role = result[0].Role;
                console.log(this.Role);
                
                console.log("SAVING COMPLETE!");
                */
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
        async updateUser() {
            try {
                const response = await fetch(`${this.backend}/v1/user/${this.UserID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                    body: JSON.stringify({
                        UserID: this.UserID,
                        FirstName: this.FirstName,
                        LastName: this.LastName,
                        Password: this.Password,
                        Email: this.Email,
                        AccountBalance: this.AccountBalance,
                        PaymentType: this.PaymentType,
                        Role: this.Role
                    }),
                    })
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            } finally {
                this.forceRerender()
            }
        },
    },

    async mounted() {
        try {
            /*
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const user = userTokenParsed.email;
            //await this.fetchUser(user);
            */
            
            console.log("all k");
        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

