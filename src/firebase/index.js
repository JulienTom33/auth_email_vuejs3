import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_ZQdfe42A5HHAOyFNitekeAZMY5Yh_EY",
  authDomain: "vueauth-b6f94.firebaseapp.com",
  projectId: "vueauth-b6f94",
  storageBucket: "vueauth-b6f94.appspot.com",
  messagingSenderId: "1048346864803",
  appId: "1:1048346864803:web:3f0481de643a8fea14e316",
  measurementId: "G-291KMPNJTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }