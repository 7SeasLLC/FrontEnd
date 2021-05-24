import { IonContent,IonPage,IonButton, IonInput, IonItem, IonCard, IonGrid, IonRow, IonCol} from '@ionic/react';
import './Login.css';

const Login = () => {
  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <img id="logo-sign-page" src="assets/logo.png" alt="parley-logo" />
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
            <IonCol className="ion-text-center" size-lg="3">
              <IonButton href="/feed">Log in</IonButton>
              <div id="forgot-password">Forgot Password?</div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton color="success" href="/signup">Create New Account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
