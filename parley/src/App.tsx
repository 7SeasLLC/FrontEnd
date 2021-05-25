import { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication'
import FirebaseConfig from './firebase.config.js';

import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from '@capacitor/core';
import Feed from './pages/Feed';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(window.localStorage.getItem('user')|| null);
  const [providerId, setProviderId] = useState();


  const handleSignIn = async () => {

      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      try {
        const result = await FirebaseConfig.auth().signInWithPopup(provider);
        console.log(result);
        setUser(result.user);
      } catch (err) {
        console.log(err)
      }
  }

  useEffect(() => {
    window.localStorage.setItem('user', user)
  }, [user])

  return (
    <IonApp>
   { user ?
      (
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/feed">
              <Feed />
            </Route>
            <Route exact path="/">
              <Redirect to="/feed" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
    ) : (
        <button
          onClick={handleSignIn}
        >
          Sign in with Google!
        </button>
    )}
  </IonApp>
  )
};

export default App;
