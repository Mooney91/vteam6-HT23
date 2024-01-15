
<script>
import Prepaid from '../components/PrepaidItem.vue'
import Membership from '../components/MembershipItem.vue'
import Cookies from 'js-cookie';

export default {
    name: 'PaymentView',

    components: {
        Prepaid,
        Membership
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
        } catch(error){
            console.log("Error encountered in mounted lifecycle hook: ", error)
        }
    }
}

</script>

<template>
    <!--<div v-if="isAuthenticated">-->
    <h3>Payment View</h3>
    <h2>Here you can change your account balance.</h2>
    <div v-if="user">
        {{ user }}
    </div>
    <Prepaid/>
    <br>
    <Membership/>
    <!--</div>-->

</template>

<!--
    IDEER:
    - Här kan jag be om lösenord + email för att verifiera.
    - Eller så kan jag skicka ett mail med en kod som de måste fylla i.

    Men Börja endast med att man kan fylla på (och ta bort) pengar på prepaid.

    - Jag kan även göra fler komponenter som jag importerar genom ex "import YourComponent from './SomeComponent.vue'",
        denna komponent har såklart eget style och script och template
        och hela komponenten kan användast som "<YourComponent />" i templaten ovan för att inkludera det innehållet.
        Detta är ett smart sätt att modularisera vyer och komponenter.
        Jag kan även använda "v-model" för att se till att värdena uppdateras.

    Tänk på att du även måste skriva dokumentation, tester, text och förbereda redovisning.
"
-->

<style>

</style>
