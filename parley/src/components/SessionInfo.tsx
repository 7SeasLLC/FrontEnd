import { IonItem } from '@ionic/react';

const SessionInfo = ({ listeners }) => {
  return (
    <IonItem>
      In Room: {listeners}
    </IonItem>
  );
};

export default SessionInfo;