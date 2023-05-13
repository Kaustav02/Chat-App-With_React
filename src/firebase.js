
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCJ8gwAEtMO2SeIQoheKbH3_vWoEOaVzM4",
  authDomain: "kaustav-chat--app.firebaseapp.com",
  projectId: "kaustav-chat--app",
  storageBucket: "kaustav-chat--app.appspot.com",
  messagingSenderId: "131237047368",
  appId: "1:131237047368:web:df3dcb1d3f7384c943bc7d"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);