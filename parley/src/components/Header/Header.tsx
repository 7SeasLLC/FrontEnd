import { IonImg, IonThumbnail, IonItem, IonAvatar, IonIcon, IonButton, IonChip } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import Logout from '../../Utils/Logout'

import ThemeToggle from './ThemeToggle';

const Header = ({ user, HeaderRight }) => {

  return (
    <IonItem lines="none">
      <IonThumbnail slot="start" onClick={()=>{window.location.href="/feed"}}>
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <h1>PARLEY</h1>
      <ThemeToggle />

      <IonButton
        onClick={() => Logout(window)}
      >
        LogOut
      </IonButton>

      <HeaderRight user={user} />

    </IonItem>
  );
}

export default Header;