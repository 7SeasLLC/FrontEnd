import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonCard, IonGrid, IonRow, IonCol, IonImg, IonNote } from '@ionic/react';
import './Login.css';


const Login = () => {
  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <img id="logo" src="assets/logo.png" alt="logo" />
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size-lg="3" >
              <IonCard>
                <IonItem>
                  <IonInput value="" placeholder="username or e-mail" onIonChange={e => console.log("")}></IonInput>
                </IonItem>
                <IonItem>
                  <IonInput type="password" value="" placeholder="password" onIonChange={e => console.log("")}></IonInput>
                </IonItem>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-text-center" size-lg="3"  >
              <IonButton>Log in</IonButton>
              <div id="forgot-password">Forgot password?</div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton color="success">Sign up</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
