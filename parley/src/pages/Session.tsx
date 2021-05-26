import React, {Fragment} from 'react';
import { } from '@ionic/react';
import openSocket from 'socket.io-client';
import Peer from 'peerjs';
import axios from 'axios'
const socket = openSocket('http://localhost:4000');
const myPeer = new Peer(undefined, {host: '/', port: 3001})
declare var MediaRecorder: any;
declare module 'axios' {
  export interface AxiosRequestConfig {
    "Content-Type": 'multipart/form-data';
  }
}

class Session extends React.Component<{}, { roomId: string, recording: boolean, users: number, host: boolean }> {
  constructor(props) {
    super(props);
    this['chunks'] = [];
    this.state = {
      roomId: 'arandomstring',
      recording: false,
      users: 0,
      host: false
    }
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  componentDidMount(){
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
      this['mediaRecorder'] = new MediaRecorder(stream, options);
      this['mediaRecorder'].ondataavailable = (e) => {
        this['chunks'].push(e.data);
      }

      this['mediaRecorder'].onstop = (e) => {
        const blob =  new Blob(this['chunks'], { 'type' : 'audio/mpeg' });
        this['chunks'] = [];
        this.sendToServer(new File([blob], 'testname2.webm'));
      }

      myPeer.on('call', call => {
        console.log('received call');
        call.answer(stream);
        var Audio = document.createElement('audio');
        Audio.classList.add('callerAudio');
        call.on('stream', callerAudioStream =>{
          this.addCallerAudio(Audio, callerAudioStream);
        })
      })

    socket.emit('rendered');
    socket.on('number-users', numClients => {
      this.setState({users: numClients});
      console.log(numClients);
    })


    socket.on('user-connected', userId => {
      this.connectToNewUser(userId, stream);
    })
  })

    socket.on('user-disconnect', userId =>{
      if (this.state[userId]){
        this.state[userId].close();
      }
    })


    myPeer.on('open', userId=>{
        socket.emit('join-room', this.state.roomId, userId);
    })

  }
  startRecording() {
    this['mediaRecorder'].start();
    this.setState({recording: true});
  }

  stopRecording() {
    this['mediaRecorder'].stop();
    this.setState({recording: false});

  }

  async sendToServer (file) {
    var bodyFormData = new FormData();
    bodyFormData.append('audio', file);
    console.log(file);
    return await axios.post('http://localhost:4000/addAudio', bodyFormData)
      .then((url) => {
        console.log(url.data)
        // window.location.replace("/feed")
      })
  }

  addCallerAudio(audio, stream) {
    audio.srcObject = stream;
    audio.addEventListener('loadedmetadata',()=> {audio.play()});
    document.getElementById('callGrid').append(audio);
  }

  connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    var audio = document.createElement('audio');
    audio.classList.add('callerAudio');
    call.on('stream', newUserAudioStream =>{
      this.addCallerAudio(audio, newUserAudioStream);
    })
    call.on('close', ()=> {
      audio.remove();
      var obj = {};
      obj[userId]= undefined;
      this.setState(obj);
    })
    var obj = {}
    obj[userId]= call;
    this.setState(obj);
  }

  render() {
    return (
    <div id= 'callGrid' style={{marginTop: '20%', marginLeft: '40%'}}>

      {this.state.recording ? (
      <Fragment>
        <button  style={{height: '50px', width: '200px'}} onClick={this.stopRecording}>End Session</button>
        <p style={{color: 'red'}}>Currently Recording</p>
      </Fragment>

      ) : <button style={{height: '50px', width: '200px'}} onClick={this.startRecording}>Start Recording</button>}
      <p style={{color: 'red', marginTop: '2%'}}>Number of listeners: {this.state.users}</p>
    </div>
    );
  }
}

export default Session;