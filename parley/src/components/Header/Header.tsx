import { IonImg, IonThumbnail, IonTitle } from '@ionic/react';



const Header = ({ user, HeaderRight }) => {

  return (
    <>
      <IonThumbnail className="headerlogoimg" slot="start" onClick={()=>{window.location.href="/feed"}}>
        <IonImg src={"/assets/logo-img.png"} />
      </IonThumbnail>
      <IonTitle size="small" className="headerlogotxt">PARLEY</IonTitle>
      <HeaderRight user={user} />
    </>
  );
}

export default Header;