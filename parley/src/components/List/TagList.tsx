import { IonCard, IonChip, IonLabel, IonCardHeader,IonCardSubtitle} from '@ionic/react';
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

<<<<<<< HEAD
const TagList = ({ tagList }) => {

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> separate component
=======

>>>>>>> add margin for search chip
  return (
    <IonCard>
      <IonCardHeader>
        Search By Tags
          </IonCardHeader>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> add margin for search chip
      <p className="search-chips">
        {tagList.map(tag => {
          return (
            <IonChip slot="center" color="primary" className="search-tag search-list" id={tag.name}>
              <IonLabel>{tag.name}</IonLabel>
            </IonChip>
          )
        })}
      </p>
<<<<<<< HEAD
=======
      {tagList.map(tag => {
        return (
          <IonChip color="primary" className="search-tag search-list" id={tag.name}>
            <IonLabel>{tag.name}</IonLabel>
          </IonChip>
        )
      })}
>>>>>>> separate component
=======
>>>>>>> add margin for search chip
=======
  return (
    <IonCard>
      <div className="all-tag">
       <IonCardSubtitle className="all-tag-title">Search by popular tags..</IonCardSubtitle>
        {tags.map(tag => {

          return (

            <IonChip outline={true} className="tag-list" color="primary" onClick={() => { search(tag.name) }}>
              <IonLabel>{tag.name}</IonLabel>
            </IonChip>)

        }
        )}
      </div>
>>>>>>> add tag list
    </IonCard>
  );
};

export default TagList;
