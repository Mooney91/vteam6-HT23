
<script>
import PrepaidItem from '../components/PrepaidItem.vue';
import MembershipItem from '../components/MembershipItem.vue';
import Cookies from 'js-cookie';

export default {
    name: 'PaymentView',

    components: {
        PrepaidItem,
        MembershipItem
    },

    props: {
        backend: String,
    },

    data() {
        return {
            user: null
        }
    },

    methods: {

    },

    async onMounted(){
        try {
            const userCookie = Cookies.get('token');
            const user = JSON.parse(userCookie);
        } catch(error) {
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

<template>
    <!--<div v-if="isAuthenticated">-->
    <h1>Payment View</h1>
    <h2>Here you can change your account balance.</h2>
    <div v-if="user">
        {{ user }}
    </div>
    <Prepaid/>
    <br>
    <Membership/>
    <!--</div>-->

</template>


<style>

</style>
