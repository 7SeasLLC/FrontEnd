import { IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline, reload } from 'ionicons/icons';

const FeedHeaderRight = ({ user, grabRecordings }) => {

  return (
    <>
      <IonButton icon-only className="headerbtn" slot="end" onClick={grabRecordings}>
        <IonIcon className="headericon" icon={reload}/>
      </IonButton>
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