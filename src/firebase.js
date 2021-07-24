import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAG5W_zn2KtQmtG693WEVLVXauAmABX3j0",
  authDomain: "notification-fc7a8.firebaseapp.com",
  projectId: "notification-fc7a8",
  storageBucket: "notification-fc7a8.appspot.com",
  messagingSenderId: "194792081543",
  appId: "1:194792081543:web:20aeb18b15c13719d01022",
  measurementId: "G-7FMM48VK07"
  }

firebase.initializeApp(config)

export default firebase