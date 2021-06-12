const config = {
    apiKey: "...",
    authDomain: "....firebaseapp.com",
    databaseURL: "https://.....firebaseio.com",
    projectId: "...",
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true,
};
firestore.settings(settings);

export default firebase;

export {
  firestore,
};