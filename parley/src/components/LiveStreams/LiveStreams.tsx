import { IonListHeader, IonList, IonItem, IonLabel, IonCard, IonCardContent, IonChip } from '@ionic/react';
import './LiveStreams.css';

const LiveStreams = ({ streams }) => {

  return (
    <>
    <IonListHeader>
      <IonLabel>Live Streams</IonLabel>
    </IonListHeader>
    <IonList>
      {streams.map((stream) => {
        if (stream.isStreaming) {
          return (
            <IonCard>
              <IonItem>
                <IonLabel>{stream.title}</IonLabel>
              </IonItem>
              <IonCardContent>
                A description goes here
                {stream.tags.map((tag) => (
                  <IonChip>
                    <IonLabel>{tag}</IonLabel>
                  </IonChip>
                ))}
              </IonCardContent>
            </IonCard>
          );
        }
      })}
    </IonList>
    </>
  );
};

export default LiveStreams;