import 'firebase/firestore'
import FirebaseConfig from '../firebase.config.js';


const db = FirebaseConfig.firestore();
const Users = db.collection("users");
const Recordings = db.collection("recordings");
const Tags = db.collection("tags");

export const getUser = async (currentUser) => {

  // const Users = db.collection("users");

  let user;

  await Users.where("authId", "==", currentUser.uid).get()
  .then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })
    user = items[0]
  });

  if (user) {
    return user
  } else {
    return createUser(currentUser)
  }

}

export const createUser = async (newUser) => {

  // const Users = db.collection('users');
  //create new user
  await Users.doc(newUser.uid).set(
    {
      authId: newUser.uid,
      bio: "I love to Parley!",
      email: newUser.email,
      username: newUser.email,
      photoUrl: newUser.photoURL,
      following: [],
      preferences: [],
      recordings: [],
    }
  );

  let user
  //retrieve the newly created user
  await Users.where("authId", "==", newUser.uid).get()
  .then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })
    user = items[0]
  });

  return user;
}

export const getTags = async () => {
  // const Tags = db.collection("tags");

  const tags = [];

  await Tags.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tags.push({...doc.data(), id: doc.id})
    })
  });

  return tags
}

export const getRecordings = async (tag, user) => {
  // const Recordings = db.collection("recordings");

  const recordings = [];

  await Recordings.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      recordings.push(doc.data())
    })
  });

  return recordings
}

export const getUserRecordings = async (userId) => {
  //get users recordings
  const doc = await Users.doc(userId).get();

  if (!doc.exists) {
    return "no recordings found";
  }

  const user = doc.data();
  //loop through recordings (calling getRecording)
  const userRecordings = user.recordings.map((id) => {
    return getRecording(id);
  })

  return await Promise.all(userRecordings);

}

export const getRecording = async (sessionId) => {
  const doc = await Recordings.doc(sessionId).get();

  if (!doc.exists) {
    return "no recording found";
  }

  return doc.data();
}

export const createRecording = async (recording) => {
  // const Recordings = db.collection("recodrings");

  try {

    await Recordings.doc(recording.sessionId).set(
      {
        sessionId: recording.sessionId,
        title: recording.title,
        Description: recording.description,
        Duration: null,
        isStreaming: true,
        StartTime: new Date(),
        EndTime: null,
        StreamURL: ``,
        S3URL: null,
        Hosts: [...recording.username],
        Tags: [...recording.tags],
        Likes: 0,
        Plays: 0,
        MaxLive: 0,
        Comments: []
      }
    )

    recording.userIds.foreEach(async (id) => {
      await Users.doc(id).update({
        recordings: db.FieldValue.arrayUnion(id)
      })
    })

  } catch (err) {
    return "an error occurred, creating your recording"
  }


}

export const updateRecording = async (update) => {
  const Recording = Recordings.doc(update.sessionId);

  try {
    await Recording.update(update);
    return "successfully saved your recording";

  } catch (err) {
    return err
  }

}