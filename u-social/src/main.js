import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "@fortawesome/fontawesome-free/js/all";
import VueAxios from "vue-axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = 'https://3.144.211.199:443/api/'

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(Toast)
    .mount("#app");