import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useState } from 'react';

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


const Feed = ({audio}) => {

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
      <IonHeader>
        <IonToolbar>
          <Header
            user={userDummy[0]}
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
          user={null}/>
        <List
          unfolded={recIsOpen}
          setFold = {handleSwitch}
          isStreaming={false}
          user={null}/>
      </IonContent>
      <CreateSession user={userDummy[0]} allTags={tags}/>
    </IonPage>
  );
};

export default Feed;
