import { IonList, IonItem, IonLabel, IonCard, IonButton, IonCardTitle, IonBadge, IonIcon, IonCardSubtitle, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption, IonNote } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline, playOutline, headsetOutline } from 'ionicons/icons';

import { useState, useEffect } from 'react';

import './List.css';

const List = ({ unfolded, audio, setFold, isStreaming, user, showTitle }) => {
  const string = isStreaming ? 'stream': 'recording';

  let count = 0;

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
      {showTitle ? (
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
      ) : null}
    {unfolded ? (
      <IonList>
        {audio.map((item) => {
          if (item.isStreaming === isStreaming) {
            count++;
            let username = item.Hosts[0].slice(0, item.Hosts[0].indexOf('@'));

            return (
              <IonItemSliding
                id={item.sessionId}
                key={item.sessionId}
                onClick={() => handleClick(item.sessionId)}
              >
                <IonItemOptions side="end" >
                  <IonItemOption>
                    <IonButton
                      icon-only
                      className="listplaybtn"
                      href={`/${isStreaming ? 'listen' : 'play'}/${item.sessionId}`}
                    >
                      <IonIcon icon={isStreaming ? headsetOutline : playOutline} />
                    </IonButton>
                  </IonItemOption>
                </IonItemOptions>
                  <IonItem lines="none">
                    <a
                      href={'/user/' + item.Hosts[0]}
                      style={{marginRight: '11px'}}>
                      <IonAvatar slot="start">
                        <img
                          alt={`${item.Hosts[0]}'s avatar`}
                          src={item.profile_img}
                        />
                      </IonAvatar>
                    </a>
                    <IonLabel>
                      <IonNote>
                        {item.Hosts[0]}
                      </IonNote>
                      <IonLabel>
                        {item.title}
                      </IonLabel>
                      {item.Tags.map((tag) => (
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
        {count === 0 ? (
          <IonItem lines="none">
            <IonCardSubtitle>
              {'No ' + string.charAt(0).toUpperCase() + string.slice(1) + 's'}
            </IonCardSubtitle>
          </IonItem>
        ) : null}
      </IonList>
    ) : null}
    </IonCard>
  );
};

export default List;
