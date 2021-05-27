import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import List from './../components/List/List';
import UserList from './../components/List/UserList';
import Header from './../components/Header/Header';
import SearchHeaderRight from './../components/Header/SearchHeaderRight';
import './search.css';
import SuggestList from '../components/List/SuggestList';
import { getRecordings } from './../Utils/Firestore'

//dummy data
import userDummy from './../dummyData/userDummy.json';

const Search = () => {

  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState(userDummy);
  const [records, setRecords] = useState([]);
  const [showListRecords, setShowListRecords] = useState([]);
  const [showListStream, setshowListStream] = useState([]);
  const [showListUser, setShowListUser] = useState([]);
  const [showSuggest, setShowSuggest] = useState(true);


  function searchRecords(key) {
    setShowSuggest(false)


    setSearchText(key)
    var showRecords = {}
    var showStreams = {}
    for (var i = 0; i < records.length; i++) {
      for (var j = 0; j < records[i].Tags.length; j++) {
        var currentTags = records[i].Tags[j];
        const shouldShow = currentTags.toLowerCase().indexOf(key);
        if (shouldShow >= 0) {
          if (!records[i].isStreaming) {
            showRecords[records[i].sessionId] = records[i];
          } else {
            showStreams[records[i].sessionId] = records[i];
          }
        }
      }
    }
    setShowListRecords(Object.values(showRecords));
    if (key === '') {
      setShowListRecords([])
      setShowSuggest(true)

    }
    setshowListStream(Object.values(showStreams));
    if (key === '') {
      setshowListStream([])
      setShowSuggest(true)

    }
    searchUsers(key)
  }


  function searchUsers(key) {
    var list = {}
    users.map((user) => {
      const shouldShow = user.username.toLowerCase().indexOf(key);
      if (shouldShow >= 0) {
        list[user.auth_id] = user;
      }
    })
    setShowListUser(Object.values(list))
    if (key === '') {
      setShowListUser([])
      setShowSuggest(true)
    }

  }
  useEffect(() => {

    getRecordings('recordings').then(res => {
      setRecords(res)
    })

  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header
            user={userDummy[0]}
            HeaderRight={SearchHeaderRight}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar placeholder="Search for people and Records.." color="primary" value={searchText} onIonChange={(e) => { searchRecords(e.target.value.toLowerCase()) }}
        ></IonSearchbar>
        {showSuggest ? <SuggestList search={searchRecords} /> : null}
        {showListUser.length > 0 ? <UserList users={showListUser} showHeader={true} /> : null}
        {showListStream.length > 0 ?
          <List
            unfolded={true}
            setFold={() => { }}
            audio={showListStream}
            isStreaming={true} />
          : null}
        {showListRecords.length > 0 ?
          <List
            unfolded={true}
            setFold={() => { }}
            audio={showListRecords}
            isStreaming={false} />
          : null
        }
      </IonContent>
    </IonPage>
  );
};

export default Search;