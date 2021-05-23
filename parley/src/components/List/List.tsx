import { IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonBadge, IonIcon, IonCardSubtitle, IonAvatar, IonItemSliding } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

import './List.css';


const List = ({ unfolded, setFold, audio, isStreaming }) => {

  const string = isStreaming ? 'stream': 'recording';

  return (
    <IonCard>
      <IonCardHeader>
      <IonItem onClick={() => setFold(string)}>
        <IonCardTitle>
          {isStreaming ? <h2>Live Streams</h2>: <h2>Recordings</h2>}
        </IonCardTitle>
          {unfolded ? <IonIcon icon={chevronUpOutline} slot="end"></IonIcon>: <IonIcon icon={chevronDownOutline} slot="end"></IonIcon>}
      </IonItem>
      </IonCardHeader>
    {unfolded ? <IonList>
      {audio.map((item) => {
        if (item.isStreaming === isStreaming) {
          return (
            <IonItemSliding key={item.recording_id}>

                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <img alt={`${item.username}'s avatar`} src={item.profile_img} />
                  </IonAvatar>
                  <IonLabel>
                    <IonCardSubtitle>
                      {item.username}
                    </IonCardSubtitle>
                    <IonCardTitle>
                      {item.title}
                    </IonCardTitle>
                    {item.tags.map((tag) => (
                      <IonBadge key={tag}>
                        {tag}
                      </IonBadge>
                    ))}
                  </IonLabel>
                </IonItem>

            </IonItemSliding>
          );
        }
      })}
    </IonList>: null}
    </IonCard>
  );
};

export default List;