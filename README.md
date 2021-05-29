# Parley Front-End

<img alt="Parlay App Logo" src="https://github.com/7SeasLLC/FrontEnd/blob/1f7c3d571e8baa0d7450f17bd4091bc622b98830/logo.png">

## Firebase :page_facing_up:

Firebase is a Google cloud service that allows us to house authentication, deployment, data storage, and application metrics under a single container.  We specifically chose to use this tool for our project because it is compatible with Ionic, a mobile first React framework we are utilizing on the Front-End.

Currently this application is using the WEB version of Firebase with plans to migrate to native IOS and Android in the future.  The following is how to set up the application utilizing the FirebaseSDK for WEB.

- **Setup**:
  - We followed Ionic documentation to integrate an Ionic app with Firebase, found here: [](https://ionicframework.com/docs/react/pwa)
  - Once this is complete, you will have the Ionic cli setup locally.  Next you will need to create a Firebase account which requires a Gmail account. There is a free tier. [](https://console.firebase.google.com/u/0/)
  - Next create a new Web Application associated with your Firebase project. For more detailed instructions, follow this link: [](https://firebase.google.com/docs/web/setup)
  - During this Firebase app creation process you will create a Firebase Config file that looks like this:
  "const config = {
    apiKey: "AIzaSyB6JS0yOxTe2bFST-HYateROqYK_se3EzM",
    authDomain: "seas-f6fe3.firebaseapp.com",
    projectId: "seas-f6fe3",
    storageBucket: "seas-f6fe3.appspot.com",
    messagingSenderId: "1049948883037",
    appId: "1:1049948883037:web:51c30900705a01edee65b4",
    measurementId: "G-KFLH1K2129"
  };"
  - Be sure to add your new Firebase Config to parley/src/firebase.config.js (this file contains only Publicly available information)
  - Currently the app requires Google Authentication and the Firestore to use.

- **Authentication**:
  - Within in your Firebase project, select "Authentication". Then click on the "sign-in method" tab. From here select Google as a sign-in provider. Following instructions above will take you to a URL that looks like this: https://console.firebase.google.com/u/0/project/{YOUR-PROJECT-NAME-HERE}/authentication/providers
  - Here is where you will enable Google as a sign-in provider.  Upon completion, you will generate a web-client id which looks like this: "1049948883037-s816aa6j66iq4kmt7ene86ootda2em0r.apps.googleusercontent.com".  You will need to add this to the index.html of the project (in the Public folder).
  <meta name="google-signin-client_id" content="1049948883037-s816aa6j66iq4kmt7ene86ootda2em0r.apps.googleusercontent.com">
  - Within the same tab as above, scroll down and add authorized domains to your project to specify which domains will have access to your Firebase (ie: localhost, your deployed service URL etc...)

- **FireStore**:
  - This project utilizes the Firebase Firestore
  - You will need to create your own collection to store the data: Users, Tags, and Recordings
    - User fields: authId: String, bio: String, email: String, following: String[], photoUrl: String, preferences: String[], Recordings: String[], username: String
    - Tags fields: count: Number, name: String
    - Recordings fields: Comments: String[], Description: String, Duration: String, EndTime: TimeStamp, Host: String[], Likes: Number, MaxLive: Number, Photos: String[], Plays: Number, S3URL: String, StartTime: TimeStamp, Tags: String[], isStreaming: Boolean, sessionId: String, title: String

- **Hosting/Deployment**
  - Be sure to install the Firebase tools globally in order to deploy directly to Firebase ($ npm install -g firebase-tools)
  - Currently the front end will not deployed will not work while deployed with Firebase because the deployed Back-End repo is using HTTP.  Currently in progress is creating a Production Back-End using HTTPS.

- **Future Development**:
  - Increased Search capabilities including Search for Recording by username, search for Recordings by Tags, and Like a search for recording by name
  - Refactor Firebase Config to use a state management library (React Context)
  - Add update methods to update follows and preferred topics for a User and likes and comments for a Recording
  - Add more auth methods including Email and Facebook

