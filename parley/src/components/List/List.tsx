import { IonList, IonItem, IonLabel, IonCard, IonButton, IonCardTitle, IonBadge, IonIcon, IonCardSubtitle, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline, playOutline } from 'ionicons/icons';

import './List.css';


const List = ({ unfolded, setFold, audio, isStreaming }) => {

  const string = isStreaming ? 'stream': 'recording';

  return (
    <IonCard>
      <IonItem onClick={() => setFold(string)}>
        <IonCardTitle>
          {isStreaming ? <h2>Live Streams</h2>: <h2>Recordings</h2>}
        </IonCardTitle>
          {unfolded ? <IonIcon icon={chevronUpOutline} slot="end"></IonIcon>: <IonIcon icon={chevronDownOutline} slot="end"></IonIcon>}
      </IonItem>
    {unfolded ? <IonList>
      {audio.map((item) => {
        if (item.isStreaming === isStreaming) {
          return (
            <IonItemSliding key={item.recording_id}>
              <IonItemOptions side="end">
                <IonItemOption>
                  <IonButton href={`/${item.recording_id}`}>
                    <IonIcon icon={playOutline} />
                  </IonButton>
                </IonItemOption>
              </IonItemOptions>
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