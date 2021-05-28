import { IonCard, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonItem, IonItemDivider, IonCardSubtitle, IonLabel, IonBadge, IonItemGroup, IonNote } from '@ionic/react';

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
    <>
    <IonCard>
      <IonCardHeader>
        <IonAvatar className="profileImg" >
          <img src={hostPhoto} alt="Your Profile"></img>
        </IonAvatar>
        <IonCardSubtitle className="profileUsername">
          {firstHost}
        </IonCardSubtitle>
        <IonCardTitle className="profileUsername">
          {title}
        </IonCardTitle>
      </IonCardHeader>
    <IonCardContent>
      <IonItem>
        {description}
      </IonItem>
    </IonCardContent>
  </IonCard>
  <IonCard>
    <IonCardContent>
      <IonItem>
        <IonLabel>
          Currently Listening
        </IonLabel>
        <IonBadge slot="end">
          {listeners}
        </IonBadge>
      </IonItem>
      <IonItem>
        <IonLabel>
          Stream Uptime
        </IonLabel>
        <IonBadge slot="end">
          {uptime}
        </IonBadge>
      </IonItem>
    </IonCardContent>
  </IonCard>
  </>
  );
};

export default SessionInfo;