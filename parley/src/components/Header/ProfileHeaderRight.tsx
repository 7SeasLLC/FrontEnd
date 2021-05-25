import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonButton, IonModal, IonTextarea } from '@ionic/react';
import { buildOutline , close } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import './Headers.css'

const ProfileHeaderRight = ({ user }) => {
  const [showModal, setShowModal] = useState(false)
  const [userBio, setUserBio] = useState(user.bio)
  const [newBioSubmitted, setNewBioSubmitted] = useState(false)

  const saveNewBio = (userBio) => {
    setNewBioSubmitted(true)
    setShowModal(false)
  }

  useEffect(() => {

  }, [newBioSubmitted])

  return (
    <>
      <IonButton
        icon-only className="headerbtn"
        slot="end"
        onClick={() => setShowModal(true)}
      >
        <IonIcon className="headericon" icon={buildOutline}/>
      </IonButton>
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
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
              autoGrow={true}
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
    </>
  );
}

export default ProfileHeaderRight;