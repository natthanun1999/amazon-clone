import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAQBE4-ETAI2eZiGl-K4ba1b7RzBss8-rg",
  authDomain: "clone-9c75c.firebaseapp.com",
  projectId: "clone-9c75c",
  storageBucket: "clone-9c75c.appspot.com",
  messagingSenderId: "108968270765",
  appId: "1:108968270765:web:a9913df2a7b8d6a4855f24",
  measurementId: "G-Y66CNKJ96V"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}