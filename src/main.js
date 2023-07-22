import { createApp } from "vue";
import App from "./App.vue";
import CanvasJSChart from "@canvasjs/vue-charts";
import VueSmartWidget from "vue-smart-widget";
// import { SmartWidgetGrid } from "vue-smart-widget";

const app = createApp(App);
// app.component(SmartWidgetGrid);
app.use(VueSmartWidget);
app.use(CanvasJSChart);
app.mount("#app");

// createApp(App).mount("#app");
