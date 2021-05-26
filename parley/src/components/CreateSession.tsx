import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonModal, IonTextarea, IonFab, IonFabButton, IonList, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption, IonInput, IonItemGroup } from '@ionic/react';
import { mic , close } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getTags, createRecording } from '../Utils/Firestore'
import './CreateSession.css'

const CreateSession = ({ user, allTags }) => {
  const [showModal, setShowModal] = useState(false)
  const [streamTitle, setStreamTitle] = useState('')
  const [streamDescription, setStreamDescription] = useState('')
  const [streamTags, setStreamTags] = useState('')
  const [dbTags, setDbTags] = useState([])

  // useEffect (() => {
  //   setDbTags(findTags());
  //   console.log(dbTags)
  // }, [])

  // const findTags = async () => {
  //   const results = await getTags()
  //   return results
  // }

  const saveInfo = () => {
    let newId = user.username + new Date()
    const streamInfo = {
      title : streamTitle,
      description : streamDescription,
      username: [user.username],
      sessionId: newId.split(' ').join(''),
      tags: streamTags,
      userIds:[user.authId]
    }
    console.log(streamInfo)
    return streamInfo
  }
  const startNewStream = async () => {
    const info = saveInfo()
    const url = info.sessionId
    try {
      await createRecording (info);
      window.location.replace(`session/${url}`);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <IonFab vertical="bottom" horizontal="center">
        <IonFabButton
          className="newStreamaButton"
          onClick={() => setShowModal(true)}
          >
            <IonIcon className="editIcon" icon={mic}/>
        </IonFabButton>
      </IonFab>
        <IonModal isOpen={showModal}>
          <IonCard>
            <IonCardHeader>
              <IonItem>
                <IonCardTitle>
                  Start New Stream
                </IonCardTitle>
                <IonButton
                  icon-only className="headerbtn"
                  slot="end"
                  onClick={() => setShowModal(false)}>
                  <IonIcon
                    className="headericon"
                    icon={ close } />
                </IonButton>
              </IonItem>
            </IonCardHeader>
            <IonCardContent>
              <IonItemGroup>
                <IonItem lines="none">
                  <IonLabel>Stream Title</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonInput
                    color="medium"
                    className="sessionEntry"
                    maxlength={30}
                    required={true}
                    onIonChange={e => setStreamTitle(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonItemGroup>
              <IonItemGroup>
                <IonItem lines="none">
                  <IonLabel>Description</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonTextarea
                    color="medium"
                    autoGrow={true}
                    className=""
                    maxlength={120}
                    required={true}
                    onIonChange={e => setStreamDescription(e.detail.value!)}
                  >
                  </IonTextarea>
                </IonItem>
              </IonItemGroup>
              <IonList>
                <IonListHeader>
                </IonListHeader>
                <IonItem lines="none">
                  <IonLabel>
                    Tags
                  </IonLabel>
                  <IonSelect
                    value={streamTags}
                    multiple={true}
                    onIonChange={e => setStreamTags(e.detail.value)}>
                      {allTags.map(tag => (
                        <IonSelectOption
                          value={tag.name}
                          key={tag.id}
                        >
                          {tag.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
            <IonButton onClick={saveNewStream}>
              Begin Stream
            </IonButton>
        </IonModal>
    </>
  );
}

export default CreateSession;