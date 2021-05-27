import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';

const SessionInfo = ({ listeners, title, host, description, uptime }) => {
  const userInfo = JSON.parse(window.localStorage.getItem('user'));
  var allHosts;
  if (host) {
    host.map((each) => {
      if (allHosts !== undefined) {
        allHosts = allHosts + ' ' + each
      } else {
        allHosts = each
      }
    })
  }

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
      Talk: {title}
    </IonItem>
    <IonItem>
      Description: {description}
    </IonItem>
    <IonItem>
      Hosts: {allHosts}
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