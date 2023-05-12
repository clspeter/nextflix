import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyCAfTw5AvtWiV3tDQt18xL9MTP4WUnjv9s",
    authDomain: "nextflix-54929.firebaseapp.com",
    projectId: "nextflix-54929",
    storageBucket: "nextflix-54929.appspot.com",
    messagingSenderId: "526139113186",
    appId: "1:526139113186:web:914bf49c1be870556be8bb"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

export { auth, db };
