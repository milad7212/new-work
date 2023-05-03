import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import './index.css'

import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';


const app = createApp(App);

app.use(router);
app.use(GridPlugin);
app.mount("#app");
