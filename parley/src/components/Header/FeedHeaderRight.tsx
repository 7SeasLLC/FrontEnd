import { IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { Fragment } from 'react';

const FeedHeaderRight = ({ user }) => {

  return (
    <>
      <IonButton icon-only className="searchbtn" slot="end" href="/search">
        <IonIcon className="searchicon" icon={searchOutline}/>
      </IonButton>
      <IonItem className="profilebtn" lines="none" slot="end" href="/profile">
        <IonChip>
        <IonAvatar>
        <img alt={'Your Profile'} src={user.profile_img} />
        </IonAvatar>
        </IonChip>
      </IonItem>
    </>
  );
}

export default FeedHeaderRight;