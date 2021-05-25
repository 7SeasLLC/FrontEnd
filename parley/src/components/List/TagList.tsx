import { IonCard, IonChip, IonLabel, IonCardHeader } from '@ionic/react';

const TagList = ({ tagList }) => {

  return (
    <IonCard>
      <IonCardHeader>
        Search By Tags
          </IonCardHeader>
      {tagList.map(tag => {
        return (
          <IonChip color="primary" className="search-tag search-list" id={tag.name}>
            <IonLabel>{tag.name}</IonLabel>
          </IonChip>
        )
      })}
    </IonCard>
  );
};

export default TagList;
