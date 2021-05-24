
import { IonContent, IonHeader, IonPage, IonTitle, IonGrid, IonRow, IonCol, IonButton, IonInput, IonCard, IonItem, IonLabel, IonIcon } from '@ionic/react';
// import { google } from 'ionicons/icons';

const Signup = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            Tag Line
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="3" >
              <IonLabel>Username or E-mail</IonLabel>
              <IonInput className="sign-up" value="" placeholder="" onIonChange={e => console.log("")}></IonInput>
              <IonLabel>{`Password (6 or more characters)`}</IonLabel>
              <IonInput className="sign-up" type="password" value="" placeholder="" onIonChange={e => console.log("")}></IonInput>

            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3">
              <p id="term-condition">{`By clicking Agree & Join, you agree to the Parley User Agreement, Privacy Policy, and Cookie Policy.`}</p>
              <IonButton expand="block" >{`Agree & Join`}</IonButton>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3" >
              <IonButton expand="block" color="dark" >
                {/* <IonIcon icon={google} ></IonIcon> */}
                Sign in with Google
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
