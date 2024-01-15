
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
        onMounted(() => {
            if (isLoading) {
                console.log("")
                //stopWatching();
                watch(() => user.value, (newUser) => {
                    if (newUser) {
                        console.log("LOGIN FUNCTION INITIATED");
                        // User object is available, loading is complete
                        auth0Loading.value = false;
                        console.log(newUser);
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
                        console.log(tokenStructure);
                        // Set cookie
                        // Here you should first make JWT and save it in a Cookie
                        Cookies.set('token', JSON.stringify(tokenStructure), { sameSite: 'lax', expires: 10, secure: true });
                        // Stop watching once user object is available
                        //stopWatching();
                        // Redirect to home
                        setTimeout(() => {
                            console.log("RIDIRECTING TO /");
                            router.push('/');
                        }, 1);
                    }
                });
            }
        });
        //const stopWatching =
        
        // Function to determine the login method based on user information
        const getUserLoginMethod = (user) => {
            if (user && user.sub) {
                console.log(user.sub)
                const loginMethod = user.sub.split('|')[0];
                console.log(loginMethod)
                if (loginMethod === 'google-oauth2') {
                    return 'Google';
                }
                return 'Unknown';
            }
            // Default to email/password
            
            return 'Email/Password';
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

