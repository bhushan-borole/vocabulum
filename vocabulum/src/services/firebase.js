import firebase from 'firebase';
import CONFIG from './creds';

firebase.initializeApp(CONFIG);
export const auth = firebase.auth;
export const db = firebase.database();