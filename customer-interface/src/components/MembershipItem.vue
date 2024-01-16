
<style>

</style>



<template>
    <h3>Membership</h3>


</template>

<script>
import Cookies from 'js-cookie';

export default {

    props: {
        backend: String,
    },

    data() {
        return {
            user: null
        }
    },

    methods: {
        changeMembership() {

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

