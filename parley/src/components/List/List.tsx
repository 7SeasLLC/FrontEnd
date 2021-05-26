import { IonList, IonItem, IonLabel, IonCard, IonButton, IonCardTitle, IonBadge, IonIcon, IonCardSubtitle, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption, IonNote } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline, playOutline } from 'ionicons/icons';

import './List.css';

const List = ({ unfolded, setFold, audio, isStreaming }) => {

  const string = isStreaming ? 'stream': 'recording';

  const handleClick = (id) => {
    let element = document.getElementById(id);
    element
      .getOpenAmount()
      .then(num => {
        if (num > 0) {
          element.close()
        } else {
          element.open();
        }
      })
  }

  return (
    <IonCard>
      <IonItem onClick={() => setFold(string)}>
        <IonCardSubtitle>
          {isStreaming ? (
            "Live Streams"
          ) : (
            "Recordings"
          )}
        </IonCardSubtitle>
          {unfolded ? (
            <IonIcon icon={chevronUpOutline} slot="end"></IonIcon>
          ) : (
            <IonIcon icon={chevronDownOutline} slot="end"></IonIcon>
          )}
      </IonItem>
    {unfolded ? (
      <IonList>
        {audio.map((item) => {
          if (item.isStreaming === isStreaming) {
            return (
              <IonItemSliding
                id={item.recording_id}
                key={item.recording_id}
                onClick={() => handleClick(item.recording_id)}
              >
                <IonItemOptions side="end" >
                  <IonItemOption>
                    <IonButton
                      icon-only
                      className="listplaybtn"
                      href={`/${isStreaming ? 'listen' : 'play'}/${item.recording_id}`}
                    >
                      <IonIcon icon={playOutline} />
                    </IonButton>
                  </IonItemOption>
                </IonItemOptions>
                  <IonItem lines="none">
                    <a
                      href={'/user/' + item.username}
                      style={{marginRight: '11px'}}>
                      <IonAvatar slot="start">
                        <img
                          alt={`${item.username}'s avatar`}
                          src={item.profile_img}
                        />
                      </IonAvatar>
                    </a>
                    <IonLabel>
                      <IonNote>
                        {item.username}
                      </IonNote>
                      <IonLabel>
                        {item.title}
                      </IonLabel>
                      {item.tags.map((tag) => (
                        <IonBadge className="audioTag" key={tag}>
                          {tag}
                        </IonBadge>
                      ))}
                    </IonLabel>
                  </IonItem>

              </IonItemSliding>
            );
          }
        })}
      </IonList>gu
    ) : null}
    </IonCard>
  );
};

export default List;