import { initializeApp } from 'firebase/app'
import{
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDW1Iw6oNx-IzzTzbAuiZo7ps8wMuNq9io",
    authDomain: "ecommerce-4adde.firebaseapp.com",
    projectId: "ecommerce-4adde",
    storageBucket: "ecommerce-4adde.appspot.com",
    messagingSenderId: "1038644929491",
    appId: "1:1038644929491:web:38ab154f1f7119d1c30526",
    measurementId: "G-8Q3TWN7BDJ"
  };
//   init firebase app
  initializeApp(firebaseConfig)

//   init services
const db = getFirestore()
// collection ref
const colRef = collection(db, 'movies')

// real time collection data

  onSnapshot(colref, (snapshot) => {
    let movies = []
    snapshot.docs.forEach((doc) => {
    movies.push({ ...doc.data(), id: doc.id })
    })
    console.log(movies)

  })
  
  // adding documents
  const addMovieForm = document.querySelector('.add')
  addMovieForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        name: addMovieForm.name.value,
        producer: addMovieForm.producer.value,
    })
    .then(() => {
        addMovieForm.reset()
    })
  })
  // delete documents
  const deleteMovieForm = document.querySelector('.delete')
  deleteMovieForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'movies', deleteMovieForm.id.value)

    deleteDoc(docRef)
    .then(() => {
        deleteMovieForm.reset()
    })
  })
