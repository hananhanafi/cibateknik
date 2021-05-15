// /plugins/firebase.js
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBZE-u0GSllXQEzPP496f2zxnWqg5pDGWU",
    authDomain: "cibateknik-dev-api.firebaseapp.com",
    projectId: "cibateknik-dev-api",
    storageBucket: "cibateknik-dev-api.appspot.com",
    messagingSenderId: "588019101729",
    appId: "1:588019101729:web:7571aed45812cc2339b360"
}

let app = null
if (!firebase.apps.length) {
    app = firebase.initializeApp(config)
}

export const db = app.database()
