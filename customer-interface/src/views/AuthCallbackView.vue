
<template>
    <div v-if="auth0Loading">
        <h2>Loading token...</h2>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Cookies from 'js-cookie';

export default {
    setup() {
        const { isLoading, isAuthenticated, loginWithRedirect, user } = useAuth0();
        const auth0Loading = ref(isLoading);
        const router = useRouter();
        // Wait until Auth0s flow is complete and user is assigned it's value.
        onMounted(() => {
            if (isLoading) {
                console.log("")
                watch(() => user.value, async (newUser) => {
                    if (newUser) {
                        console.log("LOGIN INITIATED.");
                        // User object is available, loading is complete
                        auth0Loading.value = false;
                        const loginMethod = getUserLoginMethod(newUser);
                        console.log('Login Method:', loginMethod);

                        Cookies.remove('token', { sameSite: 'lax', secure: true });
                        console.log("Cookie after removal:", Cookies.get('token'));

                        const tokenStructure = {
                            "name": newUser.name,
                            "nickname": newUser.nickname,
                            "email": newUser.email,
                            "email_verified": newUser.email_verified,
                            "picture": newUser.picture,
                            "isAuthenticated": isAuthenticated.value
                        };
                        // Set cookie
                        Cookies.set('token', JSON.stringify(tokenStructure), { sameSite: 'lax', expires: 10, secure: true });

                        // CHECK IF USER DOES NOT EXIST IN DB:
                        const dbResult = await fetchUser(newUser.email);
                        console.log("database result after trying to fetch user by email: ", dbResult);
                        if (dbResult == undefined) {
                            console.log("User doesn't exist in the database.. create new user.");
                            const usersNames = newUser.nickname.split('.');

                            const someUser = {
                                FirstName: usersNames[0],
                                LastName: usersNames[1],
                                Password: newUser.password,
                                Email: newUser.email,
                                AccountBalance: 0,
                                PaymentType: 1,
                                Role: 'Customer'
                            };
                            await createUser(someUser);
                        } else if (dbResult != undefined) {
                            console.log("User already exists in the database, continue.")
                        }

                        // Redirect to home
                        setTimeout(() => {
                            console.log("Login complete. Redirecting to /");
                            router.push('/');
                        }, 1);
                    }
                });
            }
        });

        // Function to determine the login method based on user information
        const getUserLoginMethod = (user) => {
            if (user && user.sub) {
                const loginMethod = user.sub.split('|')[0];
                console.log("login method", loginMethod);
                if (loginMethod === 'google-oauth2') {
                    return 'Google';
                }
                return 'Unknown';
            }
            // Defaults to email/password
            return 'Email/Password';
        };



        const fetchUser = async (activeUser) => {
            try {
                console.log("Fetching user data for: ", activeUser);
                console.log(activeUser);
                const response = await fetch(`http://localhost:1337/v1/user/email/${activeUser}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                });
                const result = await response.json();
                console.log("Result after fetch: ", result);
                return result[0];
            } catch (error) {
                console.error('Error fetching user data:', error);
                throw error;
            }
        };

        // CREATE USER
        const createUser = async (newUser) => {
            try {
                const response = await fetch(`http://localhost:1337/v1/user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'n7fov6opbjzqllsd53aduh1k1xcgx0mtqbi0',
                    },
                    body: JSON.stringify({
                        FirstName: newUser.FirstName,
                        LastName: newUser.LastName,
                        Password: newUser.Password,
                        Email: newUser.Email,
                        AccountBalance: newUser.AccountBalance,
                        PaymentType: newUser.PaymentType,
                        Role: newUser.Role
                    }),
                    })
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        };


        return {
            auth0Loading,
            isAuthenticated,
            loginWithRedirect,
            user,
        };
    },
};

</script>

