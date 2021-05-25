import { IonCard, IonChip, IonLabel, IonCardHeader } from '@ionic/react';

const TagList = ({ tagList }) => {

<<<<<<< HEAD

=======
>>>>>>> separate component
  return (
    <IonCard>
      <IonCardHeader>
        Search By Tags
          </IonCardHeader>
<<<<<<< HEAD
      <p className="search-chips">
        {tagList.map(tag => {
          return (
            <IonChip slot="center" color="primary" className="search-tag search-list" id={tag.name}>
              <IonLabel>{tag.name}</IonLabel>
            </IonChip>
          )
        })}
      </p>
=======
      {tagList.map(tag => {
        return (
          <IonChip color="primary" className="search-tag search-list" id={tag.name}>
            <IonLabel>{tag.name}</IonLabel>
          </IonChip>
        )
      })}
>>>>>>> separate component
    </IonCard>
  );
};

export default TagList;
