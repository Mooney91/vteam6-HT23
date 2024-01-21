
<style scoped>


#member-submit {
    padding-right: 1.5em;
    padding-left: 1.5em;
}

</style>

<template v-if="user" class="membership-signup">
    <h3>Sign up for a monthly payment plan for 600kr/month!</h3>
    <h4>This will give you access to our bikes for free for a month.</h4>

    <div v-if="signedBool"><strong><em> {{signedBool }} </em></strong></div>

    <div v-if="unsigned">
        <form v-on:submit.prevent="monthlySignUp" class="month-form">
            <label for="email">Email:</label><br>
            <input type="email" name="email" id="month-email" required placeholder="enter your email.." v-model="meEmail"/><br>
            <label for="password">Password:</label><br>
            <input type="password" name="password" id="month-password" required placeholder="enter your password.." v-model="mePassword"/><br>

            <button type="submit" id="member-submit">Sign up!</button>
        </form>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: "MembershipItem",

    inject: ['backend', 'user'],

    data() {
        return {
            UserDB: null,
            monthlyPlan: null,
            componentKey: 0,
            meEmail: null,
            mePassword: null,
            signedBool: null,
            unsigned: true,
            Cost: 0,
            Unpaid: true
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
                this.UserDB = {
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
        async fetchPlan(activeUser) {
            try {
                const response = await fetch(`${this.backend}/v1/plan/${activeUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                });
                const result = await response.json();
                console.log("result after fetch: ", result);
                this.plan = result[0];
                return result;
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        },
        async createPlan() {
            try {
                const response = await fetch(`${this.backend}/v1/plan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s'
                },
                body: JSON.stringify({
                    UserID: this.UserDB.UserID,
                    Cost: 600,
                    Unpaid: true
                })
                })
                const result = await response.json()
                return result
            } catch (error) {
                console.error('Error creating user:', error)
                throw error
            } finally {
                this.forceRerender()
            }
        },
        async updatePlan() {
            try {
                const response = await fetch(`${this.backend}/v1/plan/${this.UserDB.UserID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                    body: JSON.stringify({
                        UserID: this.UserDB.UserID,
                        Cost: this.Cost,
                        Unpaid: this.Unpaid
                    }),
                    })
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error updating plan:', error);
                throw error;
            } finally {
                this.forceRerender()
            }
        },
        async deletePlan(UserID) {
            try {
                const response = await fetch(`${this.backend}/v1/plan/${UserID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '79mozjohim15b1xk79jfj7m6tfcj0tnczn5s'
                }
                })
                const result = await response.json()

                return result
            } catch (error) {
                console.error('Error deleting user:', error)
                throw error
            } finally {
                this.forceRerender()
            }
        },
        async monthlySignUp() {
            try {
                console.log(`Signing up for monthly payment plan.`);
                this.signedBool = 'Success you are signed up!';
                await this.createPlan();
                await this.fetchPlan(this.UserDB.UserID);
                this.unsigned = false;
                this.forceRerender();
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
