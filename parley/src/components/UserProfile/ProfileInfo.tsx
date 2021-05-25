import { IonCard, IonCardTitle, IonAvatar, IonCardHeader, IonCardContent } from '@ionic/react';
import './UserProfile.css'

const ProfileInfo = ({ userInfo }) => {

  let index = 0;
  const paragraphs = userInfo.bio.split('\n')

  return (
    <IonCard>
      <IonCardHeader>
        <IonAvatar className="profileImg" >
          <img src={userInfo.profile_img} alt="Your Profile"></img>
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