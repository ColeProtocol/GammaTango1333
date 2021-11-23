import * as Firebase from "firebase";
import "firebase/firestore";
//import "firebase/auth";

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD5ELAMB9iTryylaxWyc1BlmrUC1Uf446Q",
  authDomain: "rakapp-45add.firebaseapp.com",
  projectId: "rakapp-45add",
  storageBucket: "rakapp-45add.appspot.com",
  messagingSenderId: "814684697051",
  appId: "1:814684697051:web:ff8823398dd6ee1765b7fe",
  measurementId: "G-MCN0C69243"
};

/*const firebaseConfig = {
  apiKey: "AIzaSyCJqmwHV0SLy9FWxJeoSFr3vgzlWRN8p8o",
  authDomain: "test-f556b.firebaseapp.com",
  projectId: "test-f556b",
  storageBucket: "test-f556b.appspot.com",
  messagingSenderId: "879024107074",
  appId: "1:879024107074:web:e93fd97addd411039d07db",
  measurementId: "G-JKY37NN4DC"
};*/

let app;

if (Firebase.apps.length == 0) {
  app = Firebase.initializeApp(firebaseConfig);
} else {
  app = Firebase.app();
}

const db = app.firestore();

export default Firebase;
