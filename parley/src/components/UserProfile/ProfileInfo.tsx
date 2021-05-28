import { IonCard, IonCardTitle, IonAvatar, IonCardHeader, IonCardContent } from '@ionic/react';
import './UserProfile.css'

const ProfileInfo = ({ userInfo, bio }) => {

  let index = 0;
  const paragraphs = userInfo.bio.split('\n')

  return (
    <IonCard>
      <IonCardHeader>
        <IonAvatar className="profileImg" >
          <img src={userInfo.photoUrl} alt="Your Profile"></img>
        </IonAvatar>
          <IonCardTitle className="profileUsername">
          {userInfo.username}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
      {paragraphs.map((lines) => {
        index++;
        return <p key={index}>{lines}</p>
      })}
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileInfo;