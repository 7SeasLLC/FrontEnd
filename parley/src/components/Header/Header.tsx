import { IonImg, IonThumbnail, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';


const Header = ({ user, HeaderRight, backBtn, handleThemeChange, bio, setBio, grabRecordings }) => {

  return (
    <>
      {backBtn ? (
        <IonButton
          icon-only className="headerbtn backBtn"
          slot="start"
          href="/feed"
          routerDirection="back"
        >
          <IonIcon className="headericon" icon={chevronBackOutline}/>
        </IonButton>
      ) : null}
      <IonThumbnail
        onClick={() => {window.location.href = "/feed"}}
        className="headerlogoimg" slot="start"
      >
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <IonTitle
        onClick={() => {window.location.href = "/feed"}}
        size="small" className="headerlogotxt"
      >
        PARLEY
      </IonTitle>
      <HeaderRight
        user={user}
        handleThemeChange={handleThemeChange}
        bio={bio}
        setBio={setBio}
        grabRecordings={grabRecordings}
      />

    </>
  );
}

export default Header;