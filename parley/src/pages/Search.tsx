import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonCard, IonChip, IonLabel } from '@ionic/react';
import { useState } from 'react';
import List from './../components/List/List';

//dummy data
import tag from './../dummyData/tag.json';
import userDummy from './../dummyData/userDummy.json';
import recordingDummy from './../dummyData/recordingDummy.json';

const Search = () => {

  const [searchText, setSearchText] = useState('');
  // const [tagList, setTagList] = useState(tag);
  // const [users, setUsers] = useState(userDummy);


  function handleSearchBar(e) {
    // setSearchText(e.detail.value);
    const query = e.target.value.toLowerCase();
    const items = Array.from(document.getElementsByClassName('audio-list'));

    requestAnimationFrame(() => {
      items.forEach(item => {
        item.querySelectorAll('ion-badge.md.hydrated').forEach((badge=>{
          const shouldShow = badge.outerText.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        }))
      })
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={(e) => { handleSearchBar(e) }}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <List
          unfolded={true}
          setFold = {()=>{}}
          audio={recordingDummy}
          isStreaming={true}/>
        <List
          unfolded={true}
          setFold = {()=>{}}
          audio={recordingDummy}
          isStreaming={false}/>
      </IonContent>
    </IonPage>
  );
};

export default Search;
