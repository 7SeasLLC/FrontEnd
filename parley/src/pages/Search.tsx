import { IonContent, IonHeader, IonSelect, IonPage, IonTitle, IonToolbar, IonSearchbar, IonChip, IonLabel,IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';


//dummy data
import tag from './../dummyData/tag.json';


const Search = () => {

  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {tag.map((item =>{

          return (

        <IonChip>
          <IonLabel>{item.name}</IonLabel>
        </IonChip>

          )
        }))}











      </IonContent>

    </IonPage>
  );
};

export default Search;