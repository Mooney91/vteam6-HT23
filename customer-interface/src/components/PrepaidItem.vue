
<style>

</style>



<template>
    <h3>Prepaid</h3>
    <form action="" method="get" class="prepaid-form">
        <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" required /><br>
        <!--
        <label for="password"></label>
        <input type="password" name="password" id="password" required />
        -->
        <label for="change-balance">Change your balance:</label><br>
        <input type="number" name="change-balance" id="change-balance" required /><br>
        <input type="submit" value="Submit changes!" />
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
            user: null
        }
    },

    methods: {
        changeBalance() {

        }
    },

    async onMounted(){
        try {
            const userCookie = Cookies.get('token');
            const user = JSON.parse(userCookie);

        } catch(error){
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

