import { createApp } from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import { store } from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(store)
app.use(axios, {
    baseUrl: 'http://backoffice.chm.test/',    
})

app.mount('#app')
