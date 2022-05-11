import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1Ijoid2FsdGhlcjE5OTEiLCJhIjoiY2wydDVmOHhiMDEwejNpcDI2ZGZ6dTNqZSJ9.n0QP6aREyIAaAEcbtfwWNA';

if (!navigator.geolocation) {
  alert("tu navegador no soporta Geolocation");
  throw new Error("tu navegador no soporta Geolocation");
}

createApp(App).use(store).use(router).mount("#app");
