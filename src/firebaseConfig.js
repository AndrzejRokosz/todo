import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyB4Hajohm56StE-iXoUVRI1FKX8ahDTF3Y",
    authDomain: "todo-3e305.firebaseapp.com",
    databaseURL: "https://todo-3e305.firebaseio.com",
    projectId: "todo-3e305",
    storageBucket: "todo-3e305.appspot.com",
    messagingSenderId: "905562040609"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
