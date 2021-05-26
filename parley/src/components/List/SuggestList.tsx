import { IonCard, IonChip, IonLabel, IonCardSubtitle } from '@ionic/react';
import { useState, useEffect } from 'react'
// import { getTags } from './../../Utils/Firestore'
import alltags from '../../dummyData/tag.json';
import userDummy from '../../dummyData/userDummy.json';
import UserList from './UserList';

const SuggestList = ({ search }) => {

  const [tags, setTags] = useState(alltags)
  const [users, setUsers] = useState(userDummy)

  // useEffect(() => {
  //   getTags('tags').then(res => {
  //     setTags(res.sort((a, b) => {
  //       return b.count - a.count;
  //     }))
  //   })
  // }, [])

  return (
    <div>
      <UserList users={users} showHeader={true}/>
      <IonCard>
        <div className="all-tag">
          <IonCardSubtitle className="all-tag-title"><strong>FIND CONVERSATIONS ABOUT....</strong></IonCardSubtitle>
          {tags.map(tag => {
            return (
              <IonChip outline={true} className="tag-list" color="primary" onClick={() => { search(tag.name.toLowerCase()) }}>
                <IonLabel>{tag.name}</IonLabel>
              </IonChip>
            )
          }
          )}
        </div>
      </IonCard>
    </div>
  );
};

export default SuggestList;
