import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import List from './../components/List/List';
import './Feed.css';

//dummy data
import recordingDummy from './../dummyData/recordingDummy.json';
import userDummy from './../dummyData/userDummy.json';


const Feed = () => {

  const [streamIsOpen, setStreamIsOpen] = useState(true);
  const [recIsOpen, setRecIsOpen] = useState(true);

  const handleSwitch = (component) => {
    if (component === 'stream') {
      setStreamIsOpen(!streamIsOpen);
    } else {
      setRecIsOpen(!recIsOpen);
    }
  }
  const profileRedirect = () => {
    window.location = "/profile";
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonItem lines="none">
              <IonThumbnail slot="start">
                <IonImg src={"/assets/logo-img.png"} />
              </IonThumbnail>
              <h1>PARLEY</h1>
              <IonButton className="searchbtn" slot="end" href="/search">
                  <IonIcon icon={searchOutline}/>
              </IonButton>
              <IonItem className="profilebtn" lines="none" slot="end" href="/profile">
                <IonChip>
                <IonAvatar onClick={profileRedirect}>
                <img alt={'Your Profile'} src={userDummy[0].profile_img} />
                </IonAvatar>
                </IonChip>
              </IonItem>
            </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Now Live</IonTitle>
          </IonToolbar>
        </IonHeader>
        <List
          unfolded={streamIsOpen}
          setFold = {handleSwitch}
          audio={recordingDummy}
          isStreaming={true}/>
        <List
          unfolded={recIsOpen}
          setFold = {handleSwitch}
          audio={recordingDummy}
          isStreaming={false}/>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
