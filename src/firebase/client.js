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

  addNewProduct = (callback, collection, product) => {
    // i.e. collection could : "abrigos" if it's a clothes store
    return this.db
      .collection(collection)
      .add({ ...product })
      .then((docRef) => {
        callback("Producto agregado", docRef.id);
      })
      .catch((error) => {
        console.error("No se pudo agregar correctamente", error);
      });
  };

  createCategory = () => {};

  deleteProduct = (collection, id) => {
    return this.db
      .collection(collection)
      .doc(id)
      .delete()
      .catch((error) => alert("Error: " + error));
  };

  editProduct = () => {};

  addProductImage = (file) => {
    const storage = this.storageRef.child(`images/needs/${file.name}`);
    return storage
      .put(file)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL().then((object) => {
          return object;
        });
      })
      .catch((error) => console.log(error));
  };

  getAllProducts = (collection) => {
    return this.db
      .collection(collection)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((object) => {
          return { id: object.id, ...object.data() };
        })
      );
  };

  getProductByID = (collection, id) => {
    return this.db
      .collection(collection)
      .doc(id)
      .get()
      .then((doc) => doc.data());
  };
}

export default new Firebase(firebaseConfig);
