// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "./store";
import "./js/axios.js"
import ApiService from "@/services/api-request.js";


const app = createApp(App)

ApiService.install()
app
    .use(pinia)
    .use(router)
    .mount('#app')
