import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { useState } from 'react';
// import axios from 'axios';
import './Profile.css';
import data from '../dummyData/userDummy.json'
import recordingDummy from './../dummyData/recordingDummy.json';
import Header from '../components/Header/Header'
import List from './../components/List/List';
import ProfileInfo from './../components/UserProfile/ProfileInfo'
import ProfileHeaderRight from '../components/Header/ProfileHeaderRight';

const Profile = ({ match, handleThemeChange }) => {

  // const [user, setUser] = useState(match.params.username || JSON.parse(window.localStorage.getItem('user')));
  const [userData, setUserData] = useState(data[0]);

  // axios
  //   .get('')
  //   .then(res => {
  //     setUserData(res.data);
  //   })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header user={userData}
                  HeaderRight={ProfileHeaderRight}
                  backBtn={true}
                  handleThemeChange={handleThemeChange}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ProfileInfo userInfo={userData} />
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