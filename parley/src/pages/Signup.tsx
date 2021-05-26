
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonButton} from '@ionic/react';
// import { googlePlus } from 'ionicons/icons';

const Signup = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            Tag Line/objective
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3">
              <IonButton expand="block" >Sign in with facebook</IonButton>
              or
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3" >
              <IonButton expand="block" color="dark" href="" >
                {/* <IonIcon icon={googlePlus} ></IonIcon> */}
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
