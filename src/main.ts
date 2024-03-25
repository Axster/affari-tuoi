import { createApp } from 'vue';
import App from './App.vue';
import BoxBench from './components/BoxBench.vue';
import Box from './components/Box.vue';
import Doctor from './components/Doctor.vue';
import Card from './components/Card.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const app = createApp(App);

app.component('Box', Box);
app.component('BoxBench', BoxBench);
app.component('Doctor', Doctor);
app.component('Card', Card);

app.mount('#app');
