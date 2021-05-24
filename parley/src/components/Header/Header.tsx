import { IonImg, IonThumbnail, IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

import ThemeToggle from './ThemeToggle';

const Header = ({ user, HeaderRight }) => {

  return (
    <IonItem lines="none">
      <IonThumbnail slot="start">
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <h1>PARLEY</h1>
      <ThemeToggle />
      <HeaderRight user={user} />
    </IonItem>
  );
}

export default Header;