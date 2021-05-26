import { IonCard, IonChip, IonLabel, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import { useState, useEffect } from 'react'
// import { getTags } from './../../Utils/Firestore'
import alltags from './../../dummyData/tag.json';

const TagList = ({ search }) => {

  const [tags, setTags] = useState(alltags)

  // useEffect(() => {
  //   getTags('tags').then(res => {
  //     setTags(res.sort((a, b) => {
  //       return b.count - a.count;
  //     }))
  //   })
  // }, [])

  return (
    <IonCard>
      <div className="all-tag">
        <IonCardSubtitle className="all-tag-title">Search by popular tags..</IonCardSubtitle>
        {tags.map(tag => {
          return (
            <IonChip outline={true} className="tag-list" color="primary" onClick={() => { search(tag.name.toLowerCase()) }}>
              <IonLabel>{tag.name}</IonLabel>
            </IonChip>)
        }
        )}
      </div>
    </IonCard>
  );
};

export default TagList;
