import { IonCard, IonChip, IonLabel, IonCardHeader } from '@ionic/react';

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
    </IonCard>
  );
};

export default TagList;
