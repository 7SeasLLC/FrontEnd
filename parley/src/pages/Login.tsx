import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Login.css';

const Login = ({ signin }) => {

  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center login-page">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center login-page">
            <IonButton id="log-in-button" expand="block" color="dark" onClick={signin}>
              Sign in with Google!
              </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
