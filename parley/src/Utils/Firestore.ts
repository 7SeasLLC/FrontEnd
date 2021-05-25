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
  await ('users').doc(newUser.uid).set(
    {
      authId: newUser.uid,
      email: newUser.email,
      username: newUser.email,
      photoUrl: newUser.photoURL
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

export const getRecordings = () => {

}

export const createRecording = () => {

}

export const deleteRecording = () => {

}

export const getTags = () => {

}