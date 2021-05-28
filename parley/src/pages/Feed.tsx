import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';

import Header from './../components/Header/Header';
import './Feed.css';
import List from './../components/List/List';
import './Feed.css';
import FeedHeaderRight from './../components/Header/FeedHeaderRight';
import CreateSession from './../components/CreateSession';

//dummy data
import recordingDummy from './../dummyData/recordingDummy.json';
import userDummy from './../dummyData/userDummy.json';
import tags from './../dummyData/tag.json';
import { recording } from 'ionicons/icons';
import { getRecordings, getUserRecordings } from './../Utils/Firestore';


const Feed = () => {

  const [streamIsOpen, setStreamIsOpen] = useState(true);
  const [recIsOpen, setRecIsOpen] = useState(true);
  const [audio, setAudio] = useState([]);

  const userInfo = JSON.parse(window.localStorage.getItem('user'));

  const handleSwitch = (component) => {
    if (component === 'stream') {
      setStreamIsOpen(!streamIsOpen);
    } else {
      setRecIsOpen(!recIsOpen);
    }
  }

  const grabRecordings = async () => {
    let array = await getRecordings();
    setAudio(array);
  };

  useEffect(() => {
    grabRecordings();
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header
            user={userInfo}
            HeaderRight={FeedHeaderRight}
            backBtn={false}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <List
          unfolded={streamIsOpen}
          setFold = {handleSwitch}
          isStreaming={true}
          audio={audio}
          user={null}
          showTitle={true}/>
        <List
          unfolded={recIsOpen}
          setFold = {handleSwitch}
          isStreaming={false}
          audio={audio}
          user={null}
          showTitle={true}/>
      </IonContent>
      <CreateSession user={userInfo}/>
    </IonPage>
  );
};

export default Feed;
