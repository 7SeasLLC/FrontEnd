import { useState, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, IonInput, IonItem, IonSpinner } from '@ionic/react';
import './Login.css';
import { createUserName } from '../Utils/Firestore'
import { getCurrentUser } from '../Utils/getCurrentUser'

const UserName = () => {

  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(getCurrentUser())
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitUsername = async () => {
    setIsLoading(true)
    try {

      const saved = await createUserName(user.authId, userName)
      //handle user with the same name
      if (saved) {
        setUserName("success! 🚀")
        setUser(getCurrentUser())
      } else {
        setIsLoading(false)
        alert("Name already taken");

      }

    } catch (err) {
      return err
    }

  }

  useEffect(() => {
    if (!!user.username) {
      window.location.replace("/feed");
    }
  }, [user])

  return (
    <IonPage>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-justify-content-center login-page">
            <img id="logo-username-page" src="assets/logo.png" alt="parley-logo" />
            <IonCol className="ion-justify-content-center">
            {
              isLoading ? <IonSpinner name="crescent"/> :
              <div className="ion-text-center">
                <h1 style={{textAlign: "center"}}>🎉 Welcome to Parley! 🎉</h1>
                <h2 style={{textAlign: "center"}}>Enter a Username:</h2>
              </div>
            }

            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center login-page">
            <IonCol className="ion-text-center">
                <IonItem>
                  <IonInput value={userName} placeholder="GrndKvnHR5j05" onIonChange={e => setUserName(e.detail.value!)}></IonInput>
                </IonItem>
                <br/>
              <IonButton expand="block" color="dark" onClick={handleSubmitUsername}>
                Save
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserName;
