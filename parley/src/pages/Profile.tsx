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
import { getUser, getUserRecordings } from '../Utils/Firestore';

const Profile = ({ match, handleThemeChange }) => {

  let userToGrab = match !== undefined ? (
    match.params.username
  ) : null;

  const ownInfo = JSON.parse(window.localStorage.getItem('user'));

  const [userInfo, setUserInfo] = useState({});
  const [newBio, setNewBio] = useState('')
  const [userRecords, setUserRecords] = useState([])

  const handleNewBio = (string) => {
    setNewBio(string);
  }

  const updateInfo = async () => {
    if (userToGrab !== null) {
      const otherUserInfo = await getUser(userToGrab);
      console.log(otherUserInfo);
      setNewBio(otherUserInfo.bio);
      setUserInfo(otherUserInfo);
      updateRecords(otherUserInfo.authId);
    } else {
      setUserInfo(ownInfo);
      setNewBio(ownInfo.bio);
      updateRecords(ownInfo.authId);
    }
  };

  const updateRecords = async (user) => {
    const newRecords = await getUserRecordings(user);
    if (Array.isArray(newRecords)) {
      setUserRecords(newRecords);
    }
  }

  useEffect(() => {
    updateInfo();
  }, [])

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
      {  userInfo
        ? <IonContent>
          {userInfo.bio ? (
            <ProfileInfo userInfo={userInfo} bio={newBio} />
          ) : null}
          <List
            unfolded={true}
            setFold={() => { }}
            isStreaming={true}
            user={userInfo.authId}
            showTitle={false}
            audio={userRecords}
          />
          <List
            unfolded={true}
            setFold={() => { }}
            isStreaming={false}
            user={userInfo.authId}
            showTitle={false}
            audio={userRecords}
          />
        </IonContent>
        : null
      }
    </IonPage>
  );
}

export default Profile;