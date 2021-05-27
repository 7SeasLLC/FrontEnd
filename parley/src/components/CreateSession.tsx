import { IonIcon, IonButton, IonModal, IonTextarea, IonFab, IonFabButton, IonList, IonListHeader, IonLabel, IonItem, IonSelect, IonSelectOption, IonInput} from '@ionic/react';
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
        <IonModal isOpen={showModal} className="createSession">
          <IonButton onClick={() => setShowModal(false)}>
            <IonIcon icon={ close } />
          </IonButton>
          <p className="newSessionTitle"> Start A New Stream</p>
          <p className="sessionHeader">Stream Title</p>
          <IonInput
            className="sessionEntry"
            maxlength={30}
            required={true}
            onIonChange={e => setStreamTitle(e.detail.value!)}
          >
          </IonInput>
          <p className="sessionHeader">Description</p>
          <IonTextarea
            className="sessionEntry"
            rows={3}
            maxlength={120}
            required={true}
            onIonChange={e => setStreamDescription(e.detail.value!)}
          >
          </IonTextarea>
          <IonList>
            <IonListHeader>
              <IonLabel>
                Tags
              </IonLabel>
            </IonListHeader>
            <IonItem>
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
            <IonButton onClick={startNewStream}>
              Begin Stream
            </IonButton>
        </IonModal>
    </>
  );
}

export default CreateSession;