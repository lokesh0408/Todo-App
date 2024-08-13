import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAumq_zyL0AYiRnhqEzSYvpGqWzXa8CZno",
    authDomain: "todo-971f6.firebaseapp.com",
    projectId: "todo-971f6",
    storageBucket: "todo-971f6.appspot.com",
    messagingSenderId: "200495966128",
    appId: "1:200495966128:web:01dcc4c7cbdd21e187d875",
    measurementId: "G-Q45FRCZBRG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
