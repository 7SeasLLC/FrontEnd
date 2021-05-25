import { IonList, IonItem, IonLabel, IonCard, IonButton, IonCardTitle, IonBadge, IonIcon, IonCardSubtitle, IonAvatar, IonItemSliding, IonItemOptions, IonItemOption, IonCardHeader, IonCardContent } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline, playOutline } from 'ionicons/icons';
import './UserProfile.css'

const ProfileInfo = ({ userInfo }) => {

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
      {paragraphs.map((lines) => (
        <p>{lines}</p>
      ))}
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileInfo;