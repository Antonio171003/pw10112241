import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Comienza Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9_87loBeJV-KqCi61r_qa1eTH3GQKKeU",
  authDomain: "programacion-web-4ac23.firebaseapp.com",
  projectId: "programacion-web-4ac23",
  storageBucket: "programacion-web-4ac23.appspot.com",
  messagingSenderId: "51266402872",
  appId: "1:51266402872:web:e4386f98167aae129104cd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Termina Firebase 

const app = createApp(App)

app.use(router)

app.mount('#app')
