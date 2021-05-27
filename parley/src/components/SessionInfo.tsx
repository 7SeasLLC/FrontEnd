import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem } from '@ionic/react';

const SessionInfo = ({ listeners, title, host, description, uptime, hostPhoto }) => {
  var firstHost;
  var allHosts;
  if (host) {
    firstHost = host[0]
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
          {firstHost}
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