// firebase_export_basic.js

const fs = require('fs');
const path = require('path');
const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCOl0qzkhCDmyWeeIT8AZe4xyJJlIfU5gE",
  authDomain: "myaurapp.firebaseapp.com",
  databaseURL: "https://myaurapp.firebaseio.com",
  projectId: "myaurapp",
  storageBucket: "myaurapp.appspot.com",
  messagingSenderId: "419511997060",
  appId: "1:419511997060:web:ce7aa0d308f6b484f868d1"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const realtimeDb = firebase.database();

const outputDir = './dummy';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// ✅ 1. Ambil koleksi dari Firestore
async function fetchFirestoreCollection(collectionName) {
  try {
    const snapshot = await firestore.collection(collectionName).get();
    const data = [];
    snapshot.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });
    });

    const filePath = path.join(outputDir, `${collectionName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Saved ${collectionName}.json`);
  } catch (err) {
    console.error(`❌ Error on ${collectionName}:`, err.message);
  }
}

// ✅ 2. Ambil Realtime Database
async function fetchRealtimeDatabase() {
  try {
    const snapshot = await realtimeDb.ref('/').once('value');
    const data = snapshot.val();

    fs.writeFileSync(path.join(outputDir, `realtimeDatabase.json`), JSON.stringify(data, null, 2));
    console.log(`✅ Saved realtimeDatabase.json`);
  } catch (err) {
    console.error('❌ Error fetching realtime DB:', err.message);
  }
}

// 🚀 Main
async function main() {
  const collections = ['team', 'events', 'Speakers', 'partners', 'config', 'featureevents'];

  for (const col of collections) {
    await fetchFirestoreCollection(col);
  }

  await fetchRealtimeDatabase();

  console.log('\n🎉 Selesai tanpa firebase-admin!');
}

main();
