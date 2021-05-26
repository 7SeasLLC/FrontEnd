import { IonCard, IonLabel, IonItem, IonAvatar, IonBadge } from '@ionic/react';

const UserList = ({ users }) => {

  return (
    <>
        <IonCard>
          {
            users.map(user => {
              return (
                <IonItem button={true} href={'/user/' + user.username} key={user.auth_id}>
                  <IonAvatar>
                    <img src={user.profile_img} alt={`avatar-${user.username}`} />
                  </IonAvatar>
                  <IonLabel className="user-search-list">
                    <h3>{user.username}</h3>
                    <p>{`${user.bio.slice(0, 40)}...`}</p></IonLabel>
                    <IonBadge color="primary">Follow</IonBadge>
                </IonItem>
              )
            })
          }
        </IonCard>
      </>
  );
};

export default UserList;
