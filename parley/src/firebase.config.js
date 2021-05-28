import firebase from "firebase/app";
import _ from 'underscore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyB6JS0yOxTe2bFST-HYateROqYK_se3EzM",
  authDomain: "seas-f6fe3.firebaseapp.com",
  projectId: "seas-f6fe3",
  storageBucket: "seas-f6fe3.appspot.com",
  messagingSenderId: "1049948883037",
  appId: "1:1049948883037:web:51c30900705a01edee65b4",
  measurementId: "G-KFLH1K2129"
};

const fbInit = _.debounce(firebase.initializeApp(config), 150);
const fbApp = firebase.app()

export default !firebase.apps.length ? fbInit : fbApp;