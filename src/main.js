import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { useFirebase } from "./composables/useFirebase";

const app = createApp(App);

registerPlugins(app);
useFirebase();
app.mount("#app");
