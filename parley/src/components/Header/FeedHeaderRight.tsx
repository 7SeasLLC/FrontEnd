import { IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

const FeedHeaderRight = ({ user }) => {

  return (
    <>
      <IonButton icon-only className="headerbtn" slot="end" href="/search">
        <IonIcon className="headericon" icon={searchOutline}/>
      </IonButton>
      <IonButton className="profilebtn" slot="end" href="/profile">
        <IonChip className="titlechip">
          <IonAvatar>
            <img alt={'Your Profile'} src={user.photoUrl} />
          </IonAvatar>
        </IonChip>
      </IonButton>
    </>
  );
}

export default FeedHeaderRight;