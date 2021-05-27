import { Fragment, useState, useEffect} from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton } from '@ionic/react';
import { getRecording, updateRecording } from '../Utils/Firestore';
import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios';
import Header from '../components/Header/Header';
import SessionInfo from '../components/SessionInfo';

const socket = openSocket('http://54.193.3.132');
const myPeer = new Peer(undefined, {host: '54.193.3.132', port: 3001})
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
  const [roomExists, setRoomExists] = useState(true)
  const [startTime, setStartTime] = useState(0)
  const [duration, setDuration] = useState(null)
  const [startRecord, setStartRecord] = useState(0)
  const [recordDuration, setRecordDuration] = useState(null)
  const [sessionInfo, setSessionInfo] = useState({})

  useEffect (() => {
    determineHost()
    if (startTime !== 0) {
      setInterval(() => {
        var endTime = Math.floor((new Date().getTime() / 1000))
        var difference = (endTime - startTime)
        var h = Math.floor(difference / 3600) % 24;
        var m = Math.floor(difference % 3600 / 60);
        var s = Math.floor(difference % 3600 % 60);
        if (s < 10) {
          s = '0' + s
        }
        if (m < 10) {
          m = '0' + m
        }
        var elapsed = (h + ':' + m + ':' + s)

        setDuration(elapsed)
        }, 1000)
    }
  }, [startTime])

  useEffect (() => {
    if (startRecord !== 0) {
      setInterval(() => {
        var endRecord = Math.floor((new Date().getTime() / 1000))
        var recordDifference = (endRecord - startRecord)
        var dh = Math.floor(recordDifference / 3600) % 24;
        var dm = Math.floor(recordDifference % 3600 / 60);
        var ds = Math.floor(recordDifference % 3600 % 60);
        if (ds < 10) {
          ds = '0' + ds
        }
        if (dm < 10) {
          dm = '0' + dm
        }
        var elapsedRecord = (dh + ':' + dm + ':' + ds)
        console.log(elapsedRecord)
        setRecordDuration(elapsedRecord)
      }, 1000)
    }
  }, [startRecord])

  const determineHost = async () => {
    const newuser = await JSON.parse(window.localStorage.getItem('user'))
    const data = await getRecording(roomId)
    setSessionInfo(data)
    if (data === undefined || data.Hosts === undefined) {
      setRoomExists(false)
    } else if (data.Hosts.includes(newuser.username)){
      // console.log(data.StartTime.seconds, 'counter')
      await setStartTime(data.StartTime.seconds)
      // console.log(startTime)
      // console.log(Math.floor(new Date().getTime() / 1000))
      setHost(true);
    }
  }

  const userInfo = JSON.parse(window.localStorage.getItem('user'));

  useEffect (() => {
    determineHost()
    console.log(sessionInfo)
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

    socket.on('session-ended', () => {
      alert('Session has ended')
      window.location.replace("/feed")
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
    setStartRecord(Math.floor((new Date().getTime() / 1000)))
    setRecording(false);

  }

  const sendToServer = async (file) => {
    var bodyFormData = new FormData();
    bodyFormData.append('audio', file);
    try {
      const data = await axios.post('http://54.193.3.132/addAudio', bodyFormData)
      const url = data.data
      await updateRecording ({
        sessionId: roomId,
        isStreaming: false,
        EndTime: new Date(),
        S3URL: url,
        Duration: recordDuration
      })
      socket.emit('sessionEnded');
      window.location.replace("/feed")
    } catch (err) {
      console.log('error writing to firebase', err)
    }
  }

  const addCallerAudio = (audio, stream)=> {
    audio.srcObject = stream;
    audio.addEventListener('loadedmetadata',()=> {audio.play()});
    // document.getElementById('callGrid').append(audio);
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
        <div>Session uptime: {duration} </div>
      </IonContent>
        {host ? (
        <Fragment>
        {recording ? (
            <IonButton onClick={stopRecording}>
              End Session
            </IonButton>
          ) : (
            <IonButton onClick={startRecording}>
              Start Recording
            </IonButton>
          )}
      </Fragment>
        ): null}


    </IonPage>
  );

}

export default Session;