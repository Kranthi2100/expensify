import * as firebase from 'firebase';

var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default};

// database.ref('expenses').push({
//     title: 'netflix',
//     amount: 500,
//     note: 'entertainment',
//     createdAt: 5235238352
// })

// database.ref('expenses').on('value', (snapshot)=>{
//     snapshot.forEach((childSnapshot)=>{
//         console.log({
//             id : childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
// })

// const subscription = database.ref().on('value', (snapshot) => {
//     const data = snapshot.val();
//     console.log(`${data.name} is a software developer at ${data.job.company} `);
// })




// database.ref().set({
//     name: 'kranthi',
//     job: {
//         location : 'hyderabad',
//         company: 'google'
//     }
// }).then(()=>{
//     console.log('opteration successful')
// }).catch(error=>{
//     console.log('error!')
// })

// database.ref('name').set('mike').then(()=>{
//     console.log('opteration successful')
// }).catch(error=>{
//     console.log('error!')
// })
// database.ref().update({
//     stressLevel: 6
// }).then(()=>{
//     console.log('opteration successful')
// }).catch(error=>{
//     console.log('error!')
// })
// database.ref().update({
//     'job/company': 'airtel'
// }).then(()=>{
//     console.log('opteration successful')
// }).catch(error=>{
//     console.log('error!')
// })