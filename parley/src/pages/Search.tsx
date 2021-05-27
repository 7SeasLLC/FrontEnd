
import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar, IonCard, IonBadge } from '@ionic/react';
import { useEffect, useState } from 'react';
import List from './../components/List/List';
import UserList from './../components/List/UserList';
import Header from './../components/Header/Header';
import SearchHeaderRight from './../components/Header/SearchHeaderRight';
import './search.css';
import SuggestList from '../components/List/SuggestList';
import { getRecordings, getAllUsers } from './../Utils/Firestore';

//dummy data
import userDummy from './../dummyData/userDummy.json';

const Search = ({ user }) => {

  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [showListRecords, setShowListRecords] = useState([]);
  const [showListStream, setShowListStream] = useState([]);
  const [showListUser, setShowListUser] = useState([]);
  const [streamIsOpen, setStreamIsOpen] = useState(true);
  const [recIsOpen, setRecIsOpen] = useState(true);


  const handleSwitch = (component) => {
    if (component === 'stream') {
      setStreamIsOpen(!streamIsOpen);
    } else {
      setRecIsOpen(!recIsOpen);
    }
  }


  // function searchRecords(key) {
  //   setSearchText(key)
  //   var showRecords = {}
  //   var showStreams = {}
  //   for (var i = 0; i < records.length; i++) {
  //     for (var j = 0; j < records[i].Tags.length; j++) {
  //       var currentTags = records[i].Tags[j];
  //       const shouldShow = currentTags.toLowerCase().indexOf(key);
  //       if (shouldShow >= 0) {
  //         if (!records[i].isStreaming) {
  //           showRecords[records[i].sessionId] = records[i];
  //         } else {
  //           showStreams[records[i].sessionId] = records[i];
  //         }
  //       }
  //     }
  //   }
  //   setShowListRecords(Object.values(showRecords));
  //   if (key === '') {
  //     setShowListRecords([])
  //   }
  //   setShowListStream(Object.values(showStreams));
  //   if (key === '') {
  //     setShowListStream([])
  //   }
  //   searchUsers(key)
  // }


  // function searchUsers(searchStr) {
  //   var list = {}
  //   users.map((user) => {
  //     const shouldShow = user.username.toLowerCase().indexOf(searchStr);
  //     if (shouldShow >= 0) {
  //       list[user.auth_id] = user;
  //     }
  //   })
  //   setShowListUser(Object.values(list))
  //   if (searchStr === '') {
  //     setShowListUser([])
  //   }
  // }

  // function searchByTag(array) {

  //   var showRecords = {}
  //   var showStreams = {}
  //   if (array.length > 0) {
  //     records.map(record => {
  //       var show = true;
  //       var temp = record.Tags.join(',').toLowerCase()
  //       temp = temp.split(',');

  //       array.map(tag => {
  //         if (!temp.includes(tag.toLowerCase())) {
  //           show = false;
  //         }
  //       })
  //       if (show) {
  //         if (record.isStreaming) {
  //           showStreams.sessionId = record;
  //         } else {
  //           showRecords.sessionId = record
  //         }
  //       }
  //     })

  //     setShowListRecords(Object.values(showRecords))
  //     setShowListStream(Object.values(showStreams));
  //   }
  // }


  function addToTagArray(tagStr) {
    let array = searchArray;
    array.push(tagStr);
    setSearchArray(array);
  }



  useEffect(() => {
    getRecordings('recordings').then(res => {
      setRecords(res)
    })

    getAllUsers().then(res => {
      setUsers(res)
    })

  }, [])

  const handleSearchStrChange = (string) => {
    setSearchText(string);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header
            user={userDummy[0]}
            HeaderRight={SearchHeaderRight}
            backBtn={true}
            handleThemeChange={null}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          placeholder="Search for people and Records.."
          color="primary"
          value={searchText}
          onIonChange={e => {handleSearchStrChange(e.target.value)}}
        />

        <SuggestList
          searchText={searchText}
          addToTagArray={addToTagArray}
        />

      {/* Array of Tags to Search */}
      {searchArray.length > 1 ? (
        <IonCard>
          {searchArray.map((tag) => {
      <IonBadge>{tag}</IonBadge>
          })}
        </IonCard>
      ) : null}

        {showListUser.length > 0 ? (
          <UserList
            users={showListUser}
            showHeader={true} />) : null}
        {showListStream.length > 0 ?
          (<List
            unfolded={true}
            setFold={handleSwitch}
            data={showListStream}
            isStreaming={true}
            showTitle={true}
            user={undefined} />)
          : null}
        {showListRecords.length > 0 ?
          <List
            unfolded={true}
            setFold={handleSwitch}
            data={showListRecords}
            isStreaming={false}
            showTitle={true}
            user={undefined} />
          : null
        }
      </IonContent>
    </IonPage>
  );
};

export default Search;