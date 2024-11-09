import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDVhtJKhdFrnGfOaCuaBdQwAqifKBjXwI0",
    authDomain: "reactdemo110924.firebaseapp.com",
    projectId: "reactdemo110924",
    storageBucket: "reactdemo110924.firebasestorage.app",
    messagingSenderId: "896863675899",
    appId: "1:896863675899:web:e57642d599d0c0209e975e"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}