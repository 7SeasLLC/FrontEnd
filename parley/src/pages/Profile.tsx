import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import './Profile.css';
import data from '../dummyData/userDummy.json'
import recordingDummy from './../dummyData/recordingDummy.json';
import Header from '../components/Header/Header';
import List from './../components/List/List';
import ProfileInfo from './../components/UserProfile/ProfileInfo'
import FeedHeaderRight from '../components/Header/FeedHeaderRight'
import ProfileHeaderRight from '../components/Header/ProfileHeaderRight';

const Profile = ({ match, handleThemeChange }) => {

  let ownPage = match !== undefined ? (
    match.params.username
  ) : (
    JSON.parse(window.localStorage.getItem('user'))
  );

  const [userInfo, setUserInfo] = useState(JSON.parse(window.localStorage.getItem('user')));
  const ownInfo = JSON.parse(window.localStorage.getItem('user'));

  const [newBio, setNewBio] = useState(ownInfo.bio)

  const handleNewBio = (string) => {
    setNewBio(string);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header user={ownInfo}
                  HeaderRight={match !== undefined ? FeedHeaderRight : ProfileHeaderRight}
                  backBtn={true}
                  handleThemeChange={handleThemeChange}
                  bio={newBio}
                  setBio={handleNewBio}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProfileInfo userInfo={userInfo} bio={newBio}/>
        <List
          unfolded={true}
          setFold = {() =>{}}
          isStreaming={true}
          user={userInfo.authId}
          showTitle={false}/>
        <List
          unfolded={true}
          setFold = {()=>{}}
          isStreaming={false}
          user={userInfo.authId}
          showTitle={false}/>
      </IonContent>
    </IonPage>
  );
}

export default Profile;