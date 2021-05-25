import { IonCard, IonChip, IonLabel, IonCardHeader,IonAvatar } from '@ionic/react';

const UserList = ({ users }) => {

  return (
    <IonCard>
    <IonCardHeader>
      Search By Users
    </IonCardHeader>
<<<<<<< HEAD
    <p className="search-chips">
=======
>>>>>>> separate component
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
<<<<<<< HEAD
    </p>
=======
>>>>>>> separate component
  </IonCard>
  );
};

export default UserList;
