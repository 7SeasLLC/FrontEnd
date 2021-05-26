import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonButton, IonModal, IonTextarea, IonLabel, IonFooter, IonToolbar, useIonAlert } from '@ionic/react';
import { buildOutline , close, settingsOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import Logout from '../../Utils/Logout'

import './Headers.css'
import ThemeToggle from './ThemeToggle';

const ProfileHeaderRight = ({ user }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userBio, setUserBio] = useState(user.bio);
  const [newBioSubmitted, setNewBioSubmitted] = useState(false);

  const [present] = useIonAlert();

  const saveNewBio = (userBio) => {
    setNewBioSubmitted(true)
    setShowEdit(false)
  };

  useEffect(() => {

  }, [newBioSubmitted])

  return (
    <>
      <IonButton
        icon-only className="headerbtn"
        slot="end"
        onClick={() => setShowEdit(true)}
      >
        <IonIcon className="headericon" icon={buildOutline}/>
      </IonButton>
      <IonButton
        icon-only className="headerbtn headerfarright"
        slot="end"
        onClick={() => setShowSettings(true)}
      >
        <IonIcon className="headericon" icon={settingsOutline}/>
      </IonButton>
      <IonModal
        isOpen={showEdit}
        onDidDismiss={() => setShowEdit(false)}
      >
        <IonCard>
          <IonCardHeader>
            <IonItem>
              <IonCardTitle>
                Edit Bio
              </IonCardTitle>
              <IonButton
                className="headerbtn"
                slot="end"
                onClick={() => setShowEdit(false)}
              >
                <IonIcon
                  className="headericon"
                  icon={ close }
                />
              </IonButton>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <IonTextarea
              enterkeyhint="done"
              inputmode="text"
              className="editBioText"
              maxlength={300}
              value={userBio}
              spellCheck={true}
              readonly={false}
              wrap="soft"
              onIonChange={e => setUserBio(e.detail.value!)}
            >
        </IonTextarea>
          </IonCardContent>
        </IonCard>
        <IonButton onClick={saveNewBio}>
          Save
        </IonButton>
      </IonModal>

      <IonModal
        isOpen={showSettings}
        onDidDismiss={() => setShowSettings(false)}
      >
        <IonCard>
          <IonCardHeader>
            <IonItem>
              <IonCardTitle>
                Settings
              </IonCardTitle>
              <IonButton
                className="headerbtn"
                slot="end"
                onClick={() => setShowSettings(false)}
              >
                <IonIcon
                  className="headericon"
                  icon={ close }
                />
              </IonButton>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none">
              <IonLabel>
                Theme Toggle:
              </IonLabel>
              <ThemeToggle />
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonFooter className="modal">
          <IonToolbar>
            <IonItem lines="none">
            <IonButton
              slot="end"
              onClick={() =>
                present({
                  header:'Log Out',
                  message: "Are you sure you want to log out?",
                  buttons: [
                    'Cancel',
                    {text: 'Log Out', handler: (d) => Logout(window)}
                  ]
                })
              }
            >
              Log Out
            </IonButton>
            </IonItem>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </>
  );
}

export default ProfileHeaderRight;