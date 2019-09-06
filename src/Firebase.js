/**
 * Created by bikramkawan on 9/1/17.
 */
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJ3lHlTq_SOBxxnyXAHFmFZ-PuB1qbxeI",
    authDomain: "provalista-2e3f6.firebaseapp.com",
    databaseURL: "https://provalista-2e3f6.firebaseio.com",
    projectId: "provalista-2e3f6",
    storageBucket: "provalista-2e3f6.appspot.com",
    messagingSenderId: "30432138089",
    appId: "1:30432138089:web:aca858aa0a3600633f63f8"
};
export const firebaseApp = firebase.initializeApp(config);
export const users = firebaseApp.database().ref().child('users');
export const usersWishlist = firebaseApp.database().ref().child('usersWishlist');

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();