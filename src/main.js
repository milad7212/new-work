import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import './index.css';
import Vuetify from 'vuetify'

import { GridPlugin } from '@syncfusion/ej2-vue-grids';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import 'vuetify/dist/vuetify.min.css'

const app = createApp(App);

app.use(router);
app.use(GridPlugin);
app.use(Vuetify)
app.mount("#app");
