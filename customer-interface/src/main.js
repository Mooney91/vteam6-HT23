import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import { createAuth0Client } from '@auth0/auth0-spa-js';
//import { Auth0Plugin } from '@auth0/auth0-vue'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(
    createAuth0({
        domain: "dev-yl46b5m8hfqpht5q.us.auth0.com",
        clientId: "sD3sE4NcrhKampbYzR0wzpf3spojmDx5",
        authorizationParams: {
            redirect_uri: "http://localhost:1339/authCallback"
        }
    })
);

app.mount('#app')
