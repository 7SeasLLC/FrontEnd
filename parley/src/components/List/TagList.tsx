import { IonCard, IonChip, IonLabel, IonCardHeader } from '@ionic/react';

const TagList = ({ tagList }) => {


  return (
    <IonCard>
      <IonCardHeader>
        Search By Tags
          </IonCardHeader>
      <p className="search-chips">
        {tagList.map(tag => {
          return (
            <IonChip slot="center" color="primary" className="search-tag search-list" id={tag.name}>
              <IonLabel>{tag.name}</IonLabel>
            </IonChip>
          )
        })}
      </p>
    </IonCard>
  );
};

export default TagList;