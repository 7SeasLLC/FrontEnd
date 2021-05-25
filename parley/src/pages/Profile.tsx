import { IonItem, IonLabel, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { useState } from 'react';
import './Profile.css';
import data from '../dummyData/userDummy.json'
import recordingDummy from './../dummyData/recordingDummy.json';
import Header from '../components/Header/Header'
import List from './../components/List/List';
import ProfileInfo from './../components/UserProfile/ProfileInfo'
import ProfileHeaderRight from '../components/Header/ProfileHeaderRight';

const Profile = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header user={data[0]}
                  HeaderRight={ProfileHeaderRight}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <ProfileInfo userInfo={data[0]} />
      <List
        unfolded={true}
        setFold = {() => {}}
        audio={recordingDummy}
        isStreaming={true}/>
      <List
        unfolded={true}
        setFold = {() => {}}
        audio={recordingDummy}
        isStreaming={false}/>
      </IonContent>
    </IonPage>
      );
  }

export default Profile;