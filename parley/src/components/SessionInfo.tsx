import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';

const SessionInfo = ({ listeners, title, host, description, uptime, hostPhoto }) => {

  return (
    <IonCard>
    <IonCardHeader>
      <IonAvatar className="profileImg" >
        <img src={hostPhoto} alt="Your Profile"></img>
      </IonAvatar>
      <IonCardTitle className="profileUsername">
          {host}
        </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
    <IonItem>
      Talk: {title}
    </IonItem>
    <IonItem>
      Description: {description}
    </IonItem>
    <IonItem>
      Hosts: {host}
    </IonItem>
    <IonItem>
      In Room: {listeners}
    </IonItem>
    <IonItem>
      Stream uptime: {uptime}
    </IonItem>
    </IonCardContent>
    </IonCard>
  );
};

export default SessionInfo;