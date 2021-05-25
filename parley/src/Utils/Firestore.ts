import 'firebase/firestore'
import FirebaseConfig from '../firebase.config.js';


const db = FirebaseConfig.firestore();

export const getUser = async (currentUser) => {

  const users = db.collection("users");

  let user;

  await users.where("authId", "==", currentUser.uid).get()
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
    createUser(currentUser)
  }

}

export const createUser = (newUser) => {
  console.log('create me:', newUser)
}

export const getRecordings = () => {

}

export const createRecording = () => {

}

export const deleteRecording = () => {

}

export const getTags = () => {

}