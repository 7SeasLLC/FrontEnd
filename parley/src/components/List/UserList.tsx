import { IonCard, IonLabel, IonItem, IonAvatar, IonBadge, IonCardSubtitle } from '@ionic/react';

const UserList = ({ users, showHeader}) => {

  return (
    <IonCard>
      {showHeader ? <IonCardSubtitle className="all-tag-title">Users</IonCardSubtitle> : null}
      {
        users.map(user => {
          return (
            <IonItem lines="none" button={true} href={'/user/' + user.username} key={user.authId}>
              <IonAvatar>
                <img src={user.photoUrl} alt={`avatar-${user.username}`} />
              </IonAvatar>
              <IonLabel className="user-search-list">
                <h3>{user.username}</h3>
                <p>{`${user.bio.slice(0, 40)}...`}</p></IonLabel>
              {/* <IonBadge color="primary">Follow</IonBadge> */}
            </IonItem>
          )
        })
      }
    </IonCard>
  );
};

export default UserList;
