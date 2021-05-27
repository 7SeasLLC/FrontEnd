import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import { useState } from 'react'
import './Login.css';

const Login = ({ signin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSignIn = () => {
    setIsLoading(true);
    signin();
  }

  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center login-page">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center login-page">
            <IonCol className="ion-text-center" >
              <IonButton expand="block" color="dark" onClick={handleClickSignIn}>
              {isLoading
              ? (
                <IonSpinner className="ion-text-center" name="crescent"/>
              ) : (
                'Sign in with Google!'
              )}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
