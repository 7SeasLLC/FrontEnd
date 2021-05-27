import 'firebase/firestore'
import FirebaseConfig from '../firebase.config.js';


const db = FirebaseConfig.firestore();
const Users = db.collection("users");
const Recordings = db.collection("recordings");
const Tags = db.collection("tags");

export const loginUser = async (currentUser) => {
  let user;

  try {
    await Users.where("authId", "==", currentUser.uid).get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      user = items[0]
    });

    if (user) {
      return user;
    } else {
      return createUser(currentUser);
    }
  } catch (err) {
    return err;
  }
}

export const getUser = async (username) => {
  let user;

  try {
    await Users.where("username", "==", username).get()
    .then((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      user = items[0]
    });

    return user;
  } catch (err) {
    return err;
  }
}

export const getAllUsers = async () => {
  const users = [];

  await Users.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push({...doc.data(), id: doc.id})
      })
    });
  return users;
}

export const createUser = async (newUser) => {
  //create new user
  const username = newUser.email.slice(0, newUser.email.indexOf('@'));
  await Users.doc(newUser.uid).set(
    {
      authId: newUser.uid,
      bio: "I love to Parley!",
      email: newUser.email,
      username,
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

export const createRecording = async ({sessionId, title, description, username, tags, userIds}) => {
  try {
    await Recordings.doc(sessionId).set(
      {
        sessionId: sessionId,
        title: title,
        Description: description,
        Duration: null,
        isStreaming: true,
        StartTime: new Date(),
        EndTime: null,
        S3URL: null,
        Hosts: [...username],
        Tags: [...tags],
        Likes: 0,
        Plays: 0,
        MaxLive: 0,
        Comments: []
      }
    )

    //updates all hosts with the newly created recording
    const doc = await Users.doc(userIds[0]).get();
    const userRecordings = doc.data().recordings;

    await Users.doc(userIds[0]).update({
      recordings: [...userRecordings, sessionId]
    })
    // recording.userIds.forEach(async (id) => {
    //   await Users.doc(id).update({
    //     recordings: db.FieldValue.arrayUnion(id)
    //   })
    // })

    // implementing update tag count on creation of new recording
    tags.forEach(async (tag) => {
      let currentTag;
      await Tags.where("name", "==", tag).get()
      .then((querySnapshot) => {
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push({...doc.data(), id: doc.id})
          })
          currentTag = items[0];
        });
        const count = currentTag.count + 1
      await Tags.doc(currentTag.id).update({
        count
      })
    })

  } catch (err) {
    return "an error occurred, creating your recording"
  }


}

export const updateRecording = async (update) => {
  console.log(update)
  const Recording = Recordings.doc(update.sessionId);

  try {
    await Recording.update(update);
    return "successfully saved your recording";

  } catch (err) {
    console.log(err)
    return err
  }

}