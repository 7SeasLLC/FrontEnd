import { IonPage, IonHeader, IonToolbar, IonContent, IonCard, IonCardHeader, IonAvatar, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonFooter } from '@ionic/react';
import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import FeedHeaderRight from './../components/Header/FeedHeaderRight';
import { getRecording } from './../Utils/Firestore';

const Play = ({ location, match }) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user'));
  const sessionId = match.params.recId;
  const [sessionInfo, setSessionInfo] = useState({});

  const grabSessionInfo = async () => {
    console.log(sessionId);
    let info = await getRecording(sessionId);
    console.log(info);
    setSessionInfo(info);
  }

  useEffect(() => {
    grabSessionInfo();
  }, []);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <Header user={userInfo}
                HeaderRight={FeedHeaderRight}
                backBtn={true}
                handleThemeChange={()=>{}}
        />
      </IonToolbar>
    </IonHeader>
    {sessionInfo.Hosts && sessionInfo.Hosts[0] ? (
    <>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonAvatar className="profileImg" >
            <img src={sessionInfo.Photos[0]} alt="Your Profile"></img>
            </IonAvatar>
            <IonCardSubtitle className="profileUsername">
              {sessionInfo.Hosts[0]}
            </IonCardSubtitle>
            <IonCardTitle className="profileUsername">
              {sessionInfo.title}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              {sessionInfo.Description}
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem>
            <audio
              className="audioclip"
              controls
              src={sessionInfo.S3URL}>
                  Your browser does not support the
                  <code>audio</code> element.
            </audio>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </>
    ) : null}
    </IonPage>
  )
};

export default Play;