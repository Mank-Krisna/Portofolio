import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  projectId: "mesmerizing-baton-340ks",
  appId: "1:1069697323674:web:bdd12fae886be179f30523",
  apiKey: "AIzaSyBBCb6H1V9JgJEW4u6AYcGVRyAbnUXYIrc",
  authDomain: "mesmerizing-baton-340ks.firebaseapp.com",
  storageBucket: "mesmerizing-baton-340ks.firebasestorage.app",
  messagingSenderId: "1069697323674"
};

const app = initializeApp(firebaseConfig);
const firestoreDatabaseId = "ai-studio-mankkrisnachemis-3caca41c-0eaa-429c-af3d-24d47f567c8d";
export const db = getFirestore(app, firestoreDatabaseId);
