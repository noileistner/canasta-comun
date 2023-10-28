import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { useFirebase } from "./Firebase";

const app = createApp(App);

registerPlugins(app);
useFirebase();
app.mount("#app");
