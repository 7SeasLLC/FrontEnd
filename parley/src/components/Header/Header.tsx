import { IonImg, IonThumbnail, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';


const Header = ({ user, HeaderRight, backBtn }) => {

  return (
    <>
      {backBtn ? (
        <IonButton
          icon-only className="headerbtn backBtn"
          slot="start"
          onClick={() => setShowEdit(true)}
        >
          <IonIcon className="headericon" icon={chevronBackOutline}/>
        </IonButton>
      ) : null}
      <IonThumbnail className="headerlogoimg" slot="start">
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <IonTitle size="small" className="headerlogotxt">PARLEY</IonTitle>
      <HeaderRight user={user} />
    </>
  );
}

export default Header;