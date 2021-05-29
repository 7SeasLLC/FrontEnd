# FrontEnd

<img alt="Parlay App Logo" src="https://github.com/7SeasLLC/FrontEnd/blob/1f7c3d571e8baa0d7450f17bd4091bc622b98830/logo.png">


Getting started: To download the app, follow the following steps:

npm install -g @ionic/cli
npm install
navigate into parley folder
ionic serve

What technologies we used: The front-end of Parley uses a combination of React and Ionic to render our app. We chose Ionic with the intention that anyone in any place could join a talk, therefore Parley should be a mobile-first experience.

Works in progress (status):
  Session page:
    - allow users/host to mute when they are in the streaming session (backend team is working on it).

Idea for future development:
  Login Page:
    - In addition to google account, allow users to login with other credentail accounts for example Facebook.
  Profile Page:
    - Allow users to be able to send and receive messages with other users
    - Allow users to be able to subscribe to other users and content tags
    - Provide a way for users to to shedule and rsvp to future sessions
  Feed Page:
    - Allow users to filter the feed by date and popularity
    - Enable users to like and leave the comment and share sessions
    - Provide users a way to receive opt in notifications of their upcoming sessions and the ones they are RSVP’d to
    - Allow users to continue listening to the streams/records while navigating to other pages
  Session Page:
    - allow users to scroll the play bar to skip while they are listening to the records


Source:
  - Installation : https://ionicframework.com/docs/intro/cli
  - UI components : https://ionicframework.com/docs/components



# BackEnd


# Parley Backend
A back-end server for the Parley app that connects users through  Websockets and uploads audio recordings to AWS S3

## Tech Stack

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PeerJS](https://peerjs.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Socket.io](https://socket.io/)

## Getting Started

* Install PeerJS globaly
``` sh
npm install -g peer
```
* Install npm packages
``` sh
npm install
```
* Create .env file
  * Add your AWS S3 Credentials
    * ```accessKeyId_parley = 'YOUR ACCESS KEY' ```
    * ```secretAccessKey_parley = 'YOUR SECRET ACCESS KEY'```
    * ```aws_region_parley = 'YOUR REGION'```
    * ```awsBucket_parley = 'YOUR BUCKET NAME'```

## Usage

* Start peerJS server
``` sh
peerjs --port 3001
```
* Start express server
 ``` sh
npm run server
```


