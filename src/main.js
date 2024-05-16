import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import axios from 'axios'
axios.defaults.withCredentials = true;

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_APIKEY}`,
    authDomain: `${import.meta.env.VITE_FIREBASE_AUTODOMAIN}`,
    projectId: `${import.meta.env.VITE_FIREBASE_PROJECTID}`,
    storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${import.meta.env.VITE_FIREBASE_APPID}`,
    measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENTID}`,
    databaseURL: `${import.meta.env.VITE_FIREBASE_DATABASEURL}`,
};

const fb = initializeApp(firebaseConfig);
// const fb_analytics = getAnalytics(fb);
// console.log(`${import.meta.env.VITE_API_SERVER}/test/hello`);

const app = createApp(App)
app.config.globalProperties.$firebase = fb;
app.use(createPinia())
app.use(router)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$header = {
    headers:{"Content-Type": "application/x-www-form-urlencoded"}
}

app.mount('#app')
