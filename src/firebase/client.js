import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAieXRFW5f6vwTO7QUs1sGwjhhijZgtA2g",
  authDomain: "my-onlinestore-1eec8.firebaseapp.com",
  databaseURL: "https://my-onlinestore-1eec8.firebaseio.com",
  projectId: "my-onlinestore-1eec8",
  storageBucket: "my-onlinestore-1eec8.appspot.com",
  messagingSenderId: "752963774541",
  appId: "1:752963774541:web:a7b50ee623f1a97a159404",
  measurementId: "G-THYR5LLR66",
};

class Firebase {
  constructor(config) {
    const app = firebase.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.database = app.database();
    this.storageRef = app.storage().ref();
  }

  addNewDoc = (callback, collection, doc) => {
    return this.db
      .collection(collection)
      .add({ ...doc })
      .then((docRef) => callback && callback(docRef.id))
      .catch((error) => console.error("No se pudo guardar. Error: ", error));
  };

  deleteDoc = (collection, id) => {
    return this.db
      .collection(collection)
      .doc(id)
      .delete()
      .catch((error) => alert("Error: " + error));
  };

  editDoc = (callback, collection, id, content) => {
    return this.db
      .collection(collection)
      .doc(id)
      .set(content, { merge: true })
      .then(() => callback && callback("Cambios guardados correctamente"))
      .catch((err) => console.error("Error al editar documento", err));
  };

  addImage = (path, file) => {
    const storage = this.storageRef.child(`images/${path}/${file.name}`);
    return storage
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL().then((object) => {
          return object;
        });
      })
      .catch((error) => console.log(error));
  };

  getDocsFromCollection = (collection) => {
    return this.db
      .collection(collection)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((object) => {
          return { id: object.id, ...object.data() };
        })
      );
  };

  getDocByID = (id, collection) => {
    return this.db
      .collection(collection)
      .doc(id)
      .get()
      .then((doc) => doc.data());
  };

  getProductsByCategory = (category) => {
    return this.db
      .collection("products")
      .where("category", "==", category)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((product) => {
          return { id: product.id, ...product.data() };
        })
      );
  };

  getPromotedProducts = () => {
    return this.db
      .collection("products")
      .where("prom", "==", true)
      .limit(3)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((product) => {
          return { id: product.id, ...product.data() };
        })
      );
  };

  login = (username, password, callback) => {
    return this.db
      .collection("accounts")
      .get()
      .then((snapshot) =>
        snapshot.docs.find((doc) => {
          const { pw, user } = doc.data();
          callback();
          return username === user && password === pw;
        })
      )
      .catch((err) => console.log(err));
  };
}

export default new Firebase(firebaseConfig);
