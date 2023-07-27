import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import VueSocialSharing from "vue-social-sharing";

const app = createApp(App).use(router);
app.use(VueSocialSharing);
app.mount("#app");
