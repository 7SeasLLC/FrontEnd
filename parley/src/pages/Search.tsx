
import { IonContent, IonHeader, IonPage, IonToolbar, IonSearchbar, IonCard, IonChip, IonBadge, IonCardContent, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
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
  const [searchedRecords, setSearchedRecords] = useState([]);
  const [searchedStreams, setSearchedStreams] = useState([]);
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


  const search = (searchParams) => {
    // Only search user if tags is string
    if (typeof searchParams === 'string') {
      searchUsers(searchParams)
    }

    searchAudio(searchParams);
  }

  const searchAudio = (searchParams) => {
    let searchArray = typeof searchParams === 'string' ? (
      [searchParams]
    ) : searchParams;

    var recordsToShow = []
    var streamsToShow = []


    for (var i = 0; i < records.length; i++) {
      let found = true;
      for (let j = 0; j < searchArray.length; j++) {
        let shouldShow = records[i].Tags.indexOf(searchArray[j]);
        if (shouldShow === -1) {
          found = false;
        }
      }
      if (found) {
        if (!records[i].isStreaming) {
          recordsToShow.push(records[i]);
        } else {
          streamsToShow.push(records[i]);
        }
      }
    }

    if (searchParams === '' || searchArray.length < 1) {
      setSearchedRecords([])
      setSearchedStreams([])
    } else {
      setSearchedRecords(recordsToShow);
      setSearchedStreams(streamsToShow);
    }
  }


  function searchUsers(searchStr) {
    var list = {}
    users.map((user) => {
      const shouldShow = user.username.toLowerCase().indexOf(searchStr);
      if (shouldShow >= 0) {
        list[user.auth_id] = user;
      }
    })
    setShowListUser(Object.values(list))
    if (searchStr === '') {
      setShowListUser([])
    }
  }

  // function searchByTag(array) {

  //   var recordsToShow = {}
  //   var streamsToShow = {}
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
  //           streamsToShow.sessionId = record;
  //         } else {
  //           recordsToShow.sessionId = record
  //         }
  //       }
  //     })

  //     setSearchedRecords(Object.values(recordsToShow))
  //     setSearchedStreams(Object.values(streamsToShow));
  //   }
  // }

  useEffect(() => {
    getRecordings('recordings').then(res => {
      setRecords(res)
    })

    getAllUsers().then(res => {
      setUsers(res)
    })

  }, [])

  const handleSearchStrChange = (string) => {
    search(string);
    setSearchText(string);
  };

  const addToTagArray = (tagStr) => {
    let array = searchArray.slice();
    array.push(tagStr);
    setSearchArray(array);
    search(array);
  };

  const handleRemoveTag = (tagStr) => {
    let newArray = [];
    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i] !== tagStr) {
        newArray.push(searchArray[i]);
      }
    }
    setSearchArray(newArray);
    search(newArray);
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
          onIonChange={e => { handleSearchStrChange(e.target.value) }}
        />

        {searchArray.length > 0 ? (
          <IonCard>
            <IonCardContent>
              {searchArray.map(tag => (
                <IonChip key={tag}>
                  {tag}
                  <IonIcon
                    icon={close}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </IonChip>)
              )}
            </IonCardContent>
          </IonCard>
        ) : null}

        <SuggestList
          searchText={searchText}
          searchArray={searchArray}
          addToTagArray={addToTagArray}
        />

        {showListUser.length > 0 ? (
          <UserList
            users={showListUser}
            showHeader={true} />) : null}
        {searchedStreams.length > 0 ?
          (<List
            unfolded={true}
            setFold={handleSwitch}
            data={searchedStreams}
            isStreaming={true}
            showTitle={true}
            user={undefined} />)
          : null}
        {searchedRecords.length > 0 ?
          <List
            unfolded={true}
            setFold={handleSwitch}
            data={searchedRecords}
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