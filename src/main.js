import { registerPlugins } from "@/plugins";
import { createApp } from "vue";
import App from "./App.vue";
import { useFirebase } from "./composables/useFirebase";

const app = createApp(App);

registerPlugins(app);
useFirebase();
app.mount("#app");
