import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCPkPrhzrKWxt_HZieGQLyqfPY74p-fghw",
    authDomain: "todo-lists-68c75.firebaseapp.com",
    databaseURL: "https://todo-lists-68c75.firebaseio.com",
    projectId: "todo-lists-68c75",
    storageBucket: "todo-lists-68c75.appspot.com",
    messagingSenderId: "66210521413"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
