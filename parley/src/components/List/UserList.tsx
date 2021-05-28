import { IonCard, IonLabel, IonItem, IonAvatar, IonCardSubtitle } from '@ionic/react';

const UserList = ({ users, showHeader}) => {

  return (
    <IonCard>
      {showHeader ? <IonCardSubtitle className="all-tag-title">Users</IonCardSubtitle> : null}
      {
        users.map(user => {
          return (

            //username change to not have @...
            <IonItem lines="none" button={true} href={'/user/' + 'sid.nguyen'} key={user.auth_id}>
              <IonAvatar>
                <img src={user.photoUrl} alt={`avatar-${user.username}`} />
              </IonAvatar>
              <IonLabel className="user-search-list">
                <h3>{user.username}</h3>
                <p>{`${user.bio.slice(0, 40)}...`}</p></IonLabel>
            </IonItem>
          )
        })
      }
    </IonCard>
  );
};

export default UserList;
