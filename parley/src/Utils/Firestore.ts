import 'firebase/firestore'
import FirebaseConfig from '../firebase.config.js';


// const db = FirebaseConfig.firestore();
// const Users = db.collection("users");
// const Recordings = db.collection("recordings");
// const Tags = db.collection("tags");

export const loginUser = async (currentUser) => {
  let user;
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");

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
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");

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
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");

  await Users.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push({...doc.data(), id: doc.id})
      })
    });
  return users;
}

export const createUser = async (newUser) => {
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");
  //create new user
  await Users.doc(newUser.uid).set(
    {
      authId: newUser.uid,
      bio: "I love to Parley!",
      email: newUser.email,
      username: null,
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

export const updateUser = async (userId, update) => {
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");
  const user = await Users.doc(userId);

  try {
    await user.update(update);

    const updatedUser = await Users.doc(userId).get();

    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(updatedUser.data()));

    return "successfully updated the user info";

  } catch (err) {
    console.log('update user error:', err);
    return err;
  }


}

export const createUserName = async(userId, userName) => {

  try {
    let match = await getUser(userName);

    if (match) {
      return false
    } else {
      await updateUser(userId, {username: userName})
      return true
    }

  } catch (err) {
    console.log('error in creating user name', err);
    return err
  }
}

export const getTags = async () => {
  const tags = [];
  const db = FirebaseConfig.firestore();
  const Tags = db.collection("tags");

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
  const db = FirebaseConfig.firestore();
  const Recordings = db.collection("recordings");

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
  const db = FirebaseConfig.firestore();
  const Users = db.collection("users");
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
  const db = FirebaseConfig.firestore();
  const Recordings = db.collection("recordings");
  const doc = await Recordings.doc(sessionId).get();

  if (!doc.exists) {
    return "no recording found";
  }

  return doc.data();
}

export const createRecording = async ({sessionId, title, description, username, tags, userIds, photoId}) => {
  const db = FirebaseConfig.firestore();
  const Recordings = db.collection("recordings");
  const Users = db.collection("users");
  const Tags = db.collection("tags");

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
        Hosts: username,
        Photos: photoId,
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
    console.log(err)
    return "an error occurred, creating your recording"
  }


}

export const updateRecording = async (update) => {
  console.log(update)
  const db = FirebaseConfig.firestore();
  const Recordings = db.collection("recordings");
  const recording = Recordings.doc(update.sessionId);

  try {
    await recording.update(update);
    return "successfully saved your recording";

  } catch (err) {
    console.log(err)
    return err
  }

}