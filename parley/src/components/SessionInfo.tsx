import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';

const SessionInfo = ({ listeners }) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user'));

  return (
    <IonCard>
    <IonCardHeader>
      <IonAvatar className="profileImg" >
        <img src={userInfo.photoUrl} alt="Your Profile"></img>
      </IonAvatar>
      <IonCardTitle className="profileUsername">
          {userInfo.username}
        </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
    <IonItem>
      In Room: {listeners}
    </IonItem>
    </IonCardContent>
    </IonCard>
  );
};

export default SessionInfo;