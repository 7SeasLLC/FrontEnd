import { useState, useEffect, Fragment } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonCard, IonCardContent, IonItem, IonFab } from '@ionic/react';
import { getRecording, updateRecording } from '../Utils/Firestore';
import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios';
import Header from '../components/Header/Header';
import FeedHeaderRight from './../components/Header/FeedHeaderRight';
import SessionInfo from '../components/SessionInfo';

const socket = openSocket('http://54.193.3.132');
const myPeer = new Peer(undefined, {host: '54.193.3.132', port: 3001});
declare var MediaRecorder: any;
declare module 'axios' {
  export interface AxiosRequestConfig {
    "Content-Type": 'multipart/form-data';
  }
};
var mediaRecorder;
var global;

const Session = (props) => {
  const roomId = props.location.pathname.substring(9);

  const [recording, setRecording] = useState(false);
  const [users, setUsers] = useState(0);
  const [host, setHost] = useState(false);
  const [roomExists, setRoomExists] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(null);
  const [startRecord, setStartRecord] = useState(0);
  const [recordDuration, setRecordDuration] = useState(null);
  const [sessionInfo, setSessionInfo] = useState({});
  const [muted, setMuted] = useState(true);

  useEffect (() => {
    determineHost()
    if (startTime !== 0) {
      setInterval(() => {
        var endTime = Math.floor((new Date().getTime() / 1000));
        var difference = (endTime - startTime);
        var h = Math.floor(difference / 3600) % 24;
        var m = Math.floor(difference % 3600 / 60);
        var s = Math.floor(difference % 3600 % 60);
        if (s < 10) {
          s = '0' + s;
        }
        if (m < 10) {
          m = '0' + m;
        }
        var elapsed = (h + ':' + m + ':' + s);

        setDuration(elapsed);
        }, 1000)
    }
  }, [startTime])

  useEffect (() => {
    if (startRecord !== 0) {
      setInterval(() => {
        var endRecord = Math.floor((new Date().getTime() / 1000));
        var recordDifference = (endRecord - startRecord);
        var dh = Math.floor(recordDifference / 3600) % 24;
        var dm = Math.floor(recordDifference % 3600 / 60);
        var ds = Math.floor(recordDifference % 3600 % 60);
        if (ds < 10) {
          ds = '0' + ds;
        }
        if (dm < 10) {
          dm = '0' + dm;
        }
        var elapsedRecord = (dh + ':' + dm + ':' + ds);
        setRecordDuration(elapsedRecord);
      }, 1000)
    }
  }, [startRecord])

  const determineHost = async () => {
    const newuser = await JSON.parse(window.localStorage.getItem('user'));
    const data = await getRecording(roomId);
    if (data === undefined || data.Hosts === undefined) {
      setRoomExists(false);
    } else {
      await setStartTime(data.StartTime.seconds);
      await setSessionInfo(data);
      if (data.Hosts.includes(newuser.username)){
        setHost(true);
        return true;
      }
      setHost(false);
      return false;
    }
  }

  useEffect(() => {
    determineHost();
  }, [])

  useEffect (() => {
    if (roomExists) {
      let chunks = [];
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
        if (mediaRecorder === undefined) {
          mediaRecorder = new MediaRecorder(stream, options);
        }
        if (global === undefined) {
          global = stream;
        }
        setMute(global);

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
          call.answer(global);
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

      socket.on('session-ended', () => {
        alert('Session has ended');
        window.location.replace("/feed");
      })
    })

      myPeer.on('open', userId=>{
          socket.emit('join-room', roomId, userId);
      })
    }
  }, [muted])

  const startRecording = () => {
    mediaRecorder.start();
    setStartRecord(Math.floor((new Date().getTime() / 1000)));
    setRecording(true);
  }

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  }

  const mute = () => {
    if (!muted) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  }

  const setMute = (stream) => {
    stream.getTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  }

  const sendToServer = async (file) => {
    var recordingDuration = document.getElementById('recordUptime').innerText;
    var bodyFormData = new FormData();
    bodyFormData.append('audio', file);
    try {
      const data = await axios.post('http://54.193.3.132/addAudio', bodyFormData);
      const url = data.data;
      await updateRecording ({
        sessionId: roomId,
        isStreaming: false,
        EndTime: new Date(),
        S3URL: url,
        Duration: recordingDuration
      })
      socket.emit('sessionEnded');
      window.location.replace("/feed");
    } catch (err) {
      console.log('error writing to firebase', err);
    }
  }

  const addCallerAudio = async (audio, stream)=> {
      audio.srcObject = stream;
      audio.addEventListener('loadedmetadata',()=> {audio.play()});
  }

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    var audio = document.createElement('audio');
    audio.classList.add('callerAudio');
    call.on('stream', newUserAudioStream =>{
      addCallerAudio(audio, newUserAudioStream);
    })
  }

  const userInfo = JSON.parse(window.localStorage.getItem('user'));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header user={userInfo}
                   HeaderRight={FeedHeaderRight}
                   backBtn={true}
          />
        </IonToolbar>
      </IonHeader>
      {roomExists ? (
        <>
        <IonContent>
          <SessionInfo
            listeners={users}
            title={sessionInfo.title}
            host={sessionInfo.Hosts}
            description = {sessionInfo.Description}
            uptime={duration}
            recordUptime={recordDuration}
            hostPhoto={sessionInfo.Photos}
          />
        </IonContent>
        {muted ? (
          <IonFab
            slot="fixed"
            vertical="center"
            horizontal="center"
          >
            <IonButton
              className="centeredfab"
              onClick={mute}
            >
              Unmute
            </IonButton>
          </IonFab>
          ) : (
          <IonFab
            slot="fixed"
            vertical="center"
            horizontal="center"
          >
            <IonButton
            className="centeredfab"
            onClick={mute}
            >
            Mute
            </IonButton>
          </IonFab>
            )}
        <Fragment>
        {host ? (
          <IonFab
            slot="fixed"
            vertical="bottom"
            horizontal="center"
          >
          {recording ? (
            <IonButton
              className="centeredfab"
              onClick={stopRecording}
            >
              End Session
            </IonButton>
          ) : (

            <IonButton
              className="centeredfab"
              onClick={startRecording}
            >
              Start Recording
            </IonButton>
          )}
          </IonFab>
        ): null}
        </Fragment>
        </>
      ) : (
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonItem color="warning">
              There is no session in this room
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      )}
    </IonPage>
  );
}

export default Session;