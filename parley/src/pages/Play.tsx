import { IonPage, IonHeader, IonToolbar, IonContent, IonButton } from '@ionic/react';
import Header from '../components/Header/Header';

const Play = ({ location, match }) => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <Header user={userInfo}
                HeaderRight={()=> {return null}}
                backBtn={true}
                handleThemeChange={()=>{}}
        />
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
    </IonPage>
  )
};

export default Play;