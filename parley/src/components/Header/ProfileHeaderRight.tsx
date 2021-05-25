import { IonItem, IonAvatar, IonIcon, IonButton, IonChip, IonModal, IonTextarea } from '@ionic/react';
import { buildOutline , close } from 'ionicons/icons';
import { Fragment, useState, useEffect } from 'react';
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
      <IonButton onClick={() => setShowModal(false)}>
           <IonIcon icon={ close } />
        </IonButton>
        <p className="editBio"> Edit Bio </p>
        <IonTextarea
          className="editBioText"
          rows={6}
          maxlength={300}
          value={userBio}
          onIonChange={e => setUserBio(e.detail.value!)}
        >
        </IonTextarea>
          <IonButton onClick={saveNewBio}>
            Save
          </IonButton>
      </IonModal>
    </>
  );
}

export default ProfileHeaderRight;