import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyB_HT32IXfOtZAc9nsbBTPvUWPXXp0I4uw",
  authDomain: "vue-auth-5636e.firebaseapp.com",
  projectId: "vue-auth-5636e",
  storageBucket: "vue-auth-5636e.appspot.com",
  messagingSenderId: "98168896805",
  appId: "1:98168896805:web:b7fca03ef89e87f245aecc",
  measurementId: "G-WBHL22XSL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }
