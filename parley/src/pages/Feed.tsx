import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import Header from './../components/Header/Header';
import './Feed.css';
import List from './../components/List/List';
import './Feed.css';
import FeedHeaderRight from './../components/Header/FeedHeaderRight'

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

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <Header
            user={userDummy[0]}
            HeaderRight={FeedHeaderRight}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
