// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged , signOut    } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";  
import { getFirestore ,  collection, addDoc, getDocs , deleteDoc , doc, getDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";




const firebaseConfig = {
  apiKey: "AIzaSyD5SPmVPcV6tJJUCFsQcckV0Dt9vBOlrP0",
  authDomain: "blogapp-a969c.firebaseapp.com",
  projectId: "blogapp-a969c",
  storageBucket: "blogapp-a969c.appspot.com",
  messagingSenderId: "617109912755",
  appId: "1:617109912755:web:aefe965af83fe13df9c4c6",
  measurementId: "G-94C9852S4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { uploadBytesResumable , uploadBytes, ref, storage , updateDoc , getDoc , getDocs, db , auth , createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged , signOut ,  collection, addDoc , deleteDoc , doc, getDownloadURL  };