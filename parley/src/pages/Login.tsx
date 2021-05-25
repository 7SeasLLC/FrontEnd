import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Login.css';

const Login = ({handleSignIn}) => {
  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3" >
              <IonButton expand="block" color="dark" href="" onClick={handleSignIn}>
                {/* <IonIcon icon={googlePlus} ></IonIcon> */}
                Sign in with Google!
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
