import { IonCard, IonChip, IonLabel, IonCardSubtitle, IonSearchbar, IonCardContent } from '@ionic/react';
import { useState, useEffect,  } from 'react'
import { getTags, getUser } from './../../Utils/Firestore'
import userDummy from '../../dummyData/userDummy.json';
import UserList from './UserList';

const SuggestList = ({ searchText, searchArray, addToTagArray}) => {

  const [tags, setTags] = useState([])

  useEffect(() => {
    getTags().then(res => {
      setTags(res.sort((a, b) => {
        return b.count - a.count;
      }))
    })

  }, [])

  return (
      <IonCard>
        <IonCardContent>
          {tags.map(tag => {
            if (tag.name.toLowerCase().indexOf(searchText) > -1 ||
            searchText === '') {
              if (searchArray.indexOf(tag.name) === -1) {
                return (
                  <IonChip
                    key={tag.name}
                    onClick={() => {addToTagArray(tag.name)}}
                  >
                    {tag.name}
                  </IonChip>
                )
              }
            }
          })}
        </IonCardContent>
      </IonCard>
  );
};

export default SuggestList;
