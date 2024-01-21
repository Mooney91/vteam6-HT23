<style scoped>


#card {
    padding: 1.2em;
}

#swish {
    padding: 1.2em;
}

</style>



<template v-if="user" class="payment-method">
    <h3>Select your preferred method of payment</h3>
    <div><strong>Your preferred method of payment is: {{ paymentMethod }}</strong></div>

    <input type="radio" id="card" value="Card" v-model="paymentMethod" @click="changePaymentMethod(1)" />
    <label for="Card">Card</label>
    <input type="radio" id="swish" value="Swish" v-model="paymentMethod" @click="changePaymentMethod(2)" />
    <label for="Swish">Swish</label>

</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: "PaymentMethodItem",

    inject: ['backend', 'user'],

    data() {
        return {
            //user: null,
            userDB: null,
            paymentMethod: null,
            componentKey: 0
        }
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
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
                
                if (result[0].PaymentType === 1) {
                    this.paymentMethod = 'Card';
                } else if (result[0].PaymentType === 2) {
                    this.paymentMethod = 'Swish';
                }
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
        async updateUser(newPaymentMethod) {
            try {
                console.log("UPDATE USER:");
                console.log("newPaymentMethod parameter: ", newPaymentMethod);
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
                        AccountBalance: this.AccountBalance,
                        PaymentType: newPaymentMethod,
                        Role: this.userDB.Role
                    }),
                    })
                const result = await response.json();
                console.log("result after PUT fetch: ", result);
                this.userDB.PaymentType = newPaymentMethod;
                return result;
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            } finally {
                this.forceRerender()
            }
        },
        async changePaymentMethod(newMethod) {
            try {
                console.log(`Changing preferred method of payment to ${newMethod}.`);
                console.log("this.paymentMethod: ", this.paymentMethod);
                const methodIsCard = this.paymentMethod === 'Card';
                const methodIsSwish = this.paymentMethod === 'Swish';

                if (methodIsCard && newMethod === 1) {
                    console.log("Preferred method is already card, no need to change.");
                    return
                } else if (methodIsSwish && newMethod === 2) {
                    console.log("Preferred method is already Swish, no need to change.");
                    return
                } else {
                    await this.updateUser(newMethod)
                }
            } catch(error) {
                console.log("error when changing payment method", error);
            }
        }
    },

    async mounted() {
        try {
            const userToken = Cookies.get("token");
            const userTokenParsed = JSON.parse(userToken);
            const userEmail = userTokenParsed.email;
            await this.fetchUser(userEmail);

        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

