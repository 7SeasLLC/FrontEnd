import { IonCard, IonChip, IonLabel, IonCardHeader,IonAvatar } from '@ionic/react';

const UserList = ({ users }) => {

  return (
    <IonCard>
    <IonCardHeader>
      Search By Users
    </IonCardHeader>
    {users.map(user => {
      return (
        <IonChip color="dark" className="search-user search-list" id={user.Username}>
          <IonAvatar>
            <img src={user.profile_img} alt={`tag-${user.Username}`} />
          </IonAvatar>
          <IonLabel>{user.Username}</IonLabel>
        </IonChip>
      )
    })}
  </IonCard>
  );
};

export default UserList;
