
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
  const ownInfo = JSON.parse(window.localStorage.getItem('user'));

  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchedRecords, setSearchedRecords] = useState([]);
  const [searchedStreams, setSearchedStreams] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [streamIsOpen, setStreamIsOpen] = useState(true);
  const [recIsOpen, setRecIsOpen] = useState(true);


  const handleSwitch = (component) => {
    if (component === 'stream') {
      setStreamIsOpen(!streamIsOpen);
    } else {
      setRecIsOpen(!recIsOpen);
    }
  }


  const search = (searchParams, str) => {
    // Only search user if tags is string
    console.log("----->", str)
    if (str !== undefined) {
      searchUsers(str)
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
        let strFound = false;
        for (let k = 0; k < records[i].Tags.length; k++) {
          let shouldShow = records[i].Tags[k].toLowerCase().indexOf(searchArray[j].toLowerCase());
          if (shouldShow > -1) {
            strFound = true;
          }
        }
        if (strFound === false) {
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

    console.log(recordsToShow);
    console.log(streamsToShow);
    if (searchParams === '' || searchArray.length < 1) {
      setSearchedRecords([])
      setSearchedStreams([])
    } else {
      setSearchedRecords(recordsToShow);
      setSearchedStreams(streamsToShow);
    }
  }

  const searchUsers = (searchStr) => {

    var list = users.map((user) => {
      let found = user.username.toLowerCase().indexOf(searchStr.toLowerCase());
      if (found >= 0) {
        return user;
      }
    }).filter((item) => (item !== undefined));

    console.log(list);

    if (searchStr === '') {
      setSearchedUsers([])
    } else {
      setSearchedUsers(list);
    }
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
    let newArray = searchArray.slice();
    newArray.push(string);
    if (searchArray.length > 0) {
      search(newArray, string);
    } else {
      search(string, string);
    }
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
            user={ownInfo}
            HeaderRight={SearchHeaderRight}
            backBtn={true}
            handleThemeChange={null}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSearchbar
          placeholder="Search"
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

        {searchedUsers.length ? (
          <UserList
            users={searchedUsers}
            showHeader={false} />
        ) : null}
        {searchedStreams.length ?
          (<List
            unfolded={streamIsOpen}
            setFold={handleSwitch}
            audio={searchedStreams}
            isStreaming={true}
            showTitle={true}
            user={undefined} />)
          : null}
        {searchedRecords.length > 0 ?
          <List
            unfolded={recIsOpen}
            setFold={handleSwitch}
            audio={searchedRecords}
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