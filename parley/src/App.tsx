import { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from "firebase/app";
import "firebase/auth";
import FirebaseConfig from './firebase.config.js';

import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Login from './pages/Login';

import { getUser} from './Utils/Firestore'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
const App = () => {

  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) || false);

  const handleSignIn = async () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

      try {
        const result = await FirebaseConfig.auth().signInWithPopup(provider);
        setUser(result.user);

        const user = await getUser(result.user)

        window.localStorage.setItem('user', JSON.stringify(user))
        window.location.href = "/feed";

        console.log('this should work', user)
      } catch (err) {
        console.log(err)
      }
  }

  useEffect(() => {
    console.log('im happening')
    if (user) {
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          { user ? (
            <>
            <Route exact path="/feed">
              <Feed />
            </Route>
            <Route exact path="/">
              <Redirect to="/feed" />
            </Route>
            <Route exact path="/login">
              <Redirect to="/feed" />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            </>
          ) : (
            <>
            <Route exact path="/login">
              <Login signin={handleSignIn}/>
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
            </>
          )}

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
