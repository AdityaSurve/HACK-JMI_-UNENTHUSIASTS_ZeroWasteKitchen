import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMmr4LdobYrO1fXkGB-XYOfJzCrYxfWek",
  authDomain: "foodsurplus-3c257.firebaseapp.com",
  projectId: "foodsurplus-3c257",
  storageBucket: "foodsurplus-3c257.appspot.com",
  messagingSenderId: "790427649589",
  appId: "1:790427649589:web:31208fe1ec12831648d37c"
};

export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app)
export const storage=getStorage(app);
