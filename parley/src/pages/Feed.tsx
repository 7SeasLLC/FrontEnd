import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LiveStreams from './../components/LiveStreams/LiveStreams';
import Recordings from './../components/Recordings/Recordings';
import UserProfile from './../components/UserProfile/UserProfile'
import './Feed.css';

//dummy data
import recordingDummy from './../dummyData/recordingDummy.json';


const Feed = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Now Live</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LiveStreams
          streams={recordingDummy}/>
        <Recordings
          recordings={recordingDummy}/>
        {/* <UserProfile /> */}
      </IonContent>
    </IonPage>
  );
};

export default Feed;
