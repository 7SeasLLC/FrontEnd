import { useState, useEffect} from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton } from '@ionic/react';
import { updateRecording } from '../Utils/Firestore';
import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios';
import Header from '../components/Header/Header';
import SessionInfo from '../components/SessionInfo';

const socket = openSocket('http://localhost:4000');
const myPeer = new Peer(undefined, {host: '/', port: 3001})
declare var MediaRecorder: any;
declare module 'axios' {
  export interface AxiosRequestConfig {
    "Content-Type": 'multipart/form-data';
  }
}
var mediaRecorder = {};

const Session = (props) => {
  const [roomId, setRoomId] = useState(props.location.pathname.substring(9));
  const [recording, setRecording] = useState(false);
  const [users, setUsers] = useState(0);
  const [host, setHost] = useState(false);

  const userInfo = JSON.parse(window.localStorage.getItem('user'));

  useEffect (() => {
    let chunks = []
    socket.emit('rendered');
    var myAudio = document.createElement('audio');
    myAudio.id = 'myaudio';

    navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })
    .then(stream =>{
      var options = {
        audioBitsPerSecond : 128000,
        mimeType: 'audio/webm'
      }
      mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      }

      mediaRecorder.onstop = (e) => {
        const blob =  new Blob(chunks, { 'type' : 'audio/mpeg' });
        chunks = [];
        sendToServer(new File([blob], `${roomId}`));
      }

      myPeer.on('call', call => {
        console.log('received call');
        call.answer(stream);
        var Audio = document.createElement('audio');
        Audio.classList.add('callerAudio');
        call.on('stream', callerAudioStream =>{
          addCallerAudio(Audio, callerAudioStream);
        })
      })

    socket.emit('rendered');
    socket.on('number-users', numClients => {
      setUsers(numClients);
    })


    socket.on('user-connected', userId => {
      connectToNewUser(userId, stream);
    })
  })

    // socket.on('user-disconnect', userId =>{
    //   if (this.state[userId]){
    //     this.state[userId].close();
    //   }
    // })


    myPeer.on('open', userId=>{
        socket.emit('join-room', roomId, userId);
    })

  }, [])

  const startRecording = () => {
    mediaRecorder.start();
    setRecording(true);
  }

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);

  }

   const sendToServer = async (file) => {
    var bodyFormData = new FormData();
    bodyFormData.append('audio', file);
    try {
      const data = await axios.post('http://localhost:4000/addAudio', bodyFormData)
      const url = data.data
      await updateRecording ({
        sessionId: roomId,
        isStreaming: false,
        EndTime: new Date(),
        S3URL: url
      })
      window.location.replace("/feed")
    } catch (err) {
      console.log('error writing to firebase', err)
    }
  }

  const addCallerAudio = (audio, stream)=> {
    audio.srcObject = stream;
    audio.addEventListener('loadedmetadata',()=> {audio.play()});
    document.getElementById('callGrid').append(audio);
  }

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    var audio = document.createElement('audio');
    audio.classList.add('callerAudio');
    call.on('stream', newUserAudioStream =>{
      addCallerAudio(audio, newUserAudioStream);
    })
    // call.on('close', ()=> {
    //   audio.remove();
    //   var obj = {};
    //   obj[userId]= undefined;
    //   this.setState(obj);
    // })
    // var obj = {}
    // obj[userId]= call;
    // this.setState(obj);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header user={userInfo}
                  HeaderRight={()=> {return null}}
                  backBtn={true}
                  handleThemeChange={()=>{}}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SessionInfo listeners={users}/>
      </IonContent>
          {recording ? (
            <IonButton onClick={stopRecording}>
              End Session
            </IonButton>
          ) : (
            <IonButton onClick={startRecording}>
              Start Recording
            </IonButton>
          )}
    </IonPage>
  );

}

export default Session;