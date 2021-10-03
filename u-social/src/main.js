import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '@fortawesome/fontawesome-free/js/all'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://localhost:3000/api'
createApp(App).use(router).use(VueAxios, axios).mount('#app')