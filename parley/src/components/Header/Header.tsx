import { IonImg, IonThumbnail, IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

import ThemeToggle from './ThemeToggle';

const Header = ({ user }) => {

  return (
    <IonItem lines="none">
      <IonThumbnail slot="start">
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <h1>PARLEY</h1>
      <ThemeToggle />
      <IonButton icon-only className="searchbtn" slot="end" href="/search">
        <IonIcon className="searchicon" icon={searchOutline}/>
      </IonButton>
      <IonItem className="profilebtn" lines="none" slot="end" href="/profile">
        <IonChip>
        <IonAvatar>
        <img alt={'Your Profile'} src={user.profile_img} />
        </IonAvatar>
        </IonChip>
      </IonItem>
    </IonItem>
  );
}

export default Header;