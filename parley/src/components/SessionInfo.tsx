import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';

const SessionInfo = ({ listeners, title, host, description, uptime, hostName, hostPhoto }) => {
  // const userInfo = JSON.parse(window.localStorage.getItem('user'));
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
        <img src={hostPhoto} alt="Your Profile"></img>
      </IonAvatar>
      <IonCardTitle className="profileUsername">
          {hostName}
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