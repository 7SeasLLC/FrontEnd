import { IonItem, IonAvatar, IonChip } from '@ionic/react';


const SearchHeaderRight = ({ user }) => {

  return (
    <>
      <IonItem className="profilebtn" lines="none" slot="end" href="/profile">
        <IonChip className="titlechip">
        <IonAvatar>
        <img alt={'Your Profile'} src={user.profile_img} />
        </IonAvatar>
        </IonChip>
      </IonItem>
    </>
  );
}

export default SearchHeaderRight
;