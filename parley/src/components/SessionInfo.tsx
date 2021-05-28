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

  const handleAvatarClick = () => {
    window.location.href = `/user/${host[0]}`;
  }

  return (
    <>
    <IonCard>
      <IonCardHeader>
        <IonAvatar
          className="profileImg"
          onClick={handleAvatarClick}
        >
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
      <IonItem lines="none">
        {description}
      </IonItem>
    </IonCardContent>
  </IonCard>
  <IonCard>
    <IonCardContent>
      <IonItem lines="none">
        <IonLabel>
          Currently Listening
        </IonLabel>
        <IonBadge slot="end">
          {listeners}
        </IonBadge>
      </IonItem>
      <IonItem lines="none">
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