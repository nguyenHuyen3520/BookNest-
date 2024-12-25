var admin = require("firebase-admin");

var serviceAccount = require("./server-image-b9408-firebase-adminsdk-cazc4-5e2df4e70c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-image-b9408-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "server-image-b9408.appspot.com"
});

const bucket = admin.storage().bucket();
module.exports = bucket;
