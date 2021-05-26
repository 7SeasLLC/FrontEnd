import 'firebase/firestore'
import FirebaseConfig from '../firebase.config.js';


const db = FirebaseConfig.firestore();

export const getUser = async (currentUser) => {

  const Users = db.collection("users");

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

  const Users = db.collection('users');
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
  const Tags = db.collection("tags");

  let tags = [];

  await Tags.get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      tags.push(doc.data())
    })
  });

  return tags
}

export const getRecordings = () => {

}

export const createRecording = () => {

}

export const deleteRecording = () => {

}