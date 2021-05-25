import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow } from '@ionic/react';
import { useState } from 'react';
import List from './../components/List/List';
import TagList from './../components/List/TagList';
import UserList from './../components/List/UserList';
import Header from './../components/Header/Header';
import SearchHeaderRight from './../components/Header/SearchHeaderRight'
import './search.css';

//dummy data
import tag from './../dummyData/tag.json';
import userDummy from './../dummyData/userDummy.json';
import recordingDummy from './../dummyData/recordingDummy.json';

const Search = () => {

  const [searchText, setSearchText] = useState('');
  const [tagList, setTagList] = useState(tag);
  const [users, setUsers] = useState(userDummy);
  const [records, setRecords] = useState(recordingDummy);
  const [showList, setShowList] = useState([]);


  function handleSearchBar(e) {
    const query = e.target.value.toLowerCase();
    setSearchText(query)
    const items = Array.from(document.getElementsByClassName('search-list'));
    items.forEach(item => {
      const shouldShow = item.id.toLowerCase().indexOf(query) > -1;
      item.style.display = shouldShow ? '' : 'none';
    })
    getRecording(query)
  }

  function getRecording(key) {
    for (var i = 0; i < tagList.length; i++) {
      if (key === tagList[i].name) {
        var ids = tagList[i].recording_id;
        break;
      }
    }
    var recordings = []

    if (ids !== undefined) {
      recordings = ids.map((id) => {
        return records[id - 1]
      });
      setShowList(recordings);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <Header
            user={userDummy[0]}
            HeaderRight={SearchHeaderRight}
          />
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={(e) => { handleSearchBar(e) }}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <UserList users={users} />
        <TagList tagList={tagList} />

        {showList.length > 0 && showList !== undefined
          ? <div><List
            unfolded={true}
            setFold={() => { }}
            audio={showList}
            isStreaming={true} />
            <List
              unfolded={true}
              setFold={() => { }}
              audio={showList}
              isStreaming={false} /></div>
          : null
        }
      </IonContent>
    </IonPage>
  );
};

export default Search;
