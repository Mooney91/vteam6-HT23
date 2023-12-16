import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

import "leaflet"

// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// /* add icons to the library */
// library.add(faUserSecret)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(
    createAuth0({
        domain: "dev-yl46b5m8hfqpht5q.us.auth0.com",
        clientId: "sD3sE4NcrhKampbYzR0wzpf3spojmDx5",
        authorizationParams: {
            redirect_uri: "http://localhost:1338/"
        }
    })
)

// app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
