import { IonItemGroup, IonItemDivider, IonItem, IonLabel } from '@ionic/react';
import './Recordings.css';

const Recordings = ({ recordings }) => {

  return (
    <IonItemGroup>
      <IonItemDivider>
        <IonLabel>Recordings</IonLabel>
      </IonItemDivider>
      {recordings.map((recording) => {
        if (!recording.isStreaming) {
          return (
            <IonItem>
              <IonLabel>{recording.title}</IonLabel>
            </IonItem>
          );
        }
      })}
    </IonItemGroup>
  );
};

export default Recordings;