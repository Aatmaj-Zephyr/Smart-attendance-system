const admin = require("firebase-admin");
const { MongoClient } = require('mongodb');

// Initialize Firebase Admin SDK with your Firebase service account credentials
const serviceAccount = require("./smart-attendance-system-108f7-firebase-adminsdk-bk154-32780ce5f0.json"); // Replace with your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-attendance-system-108f7-default-rtdb.firebaseio.com" // Replace with your Firebase database URL
});

// Initialize the MongoDB client
const uri = "mongodb+srv://Cluster72532:QkjX2Ud8fEHVDZZ@cluster0.bnfvh7o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Reference the Firebase Realtime Database node
    const db = admin.database();
    const ref = db.ref("SRS"); // Replace with the path to your Firebase node

    // Read data from Firebase
    ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Insert data into MongoDB
        insertData(data);
      } else {
        console.log("No data found in Firebase node.");
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function insertData(data) {
  try {
    const database = client.db("attendance");
    const collection = database.collection("SRS");

    // Insert the data from Firebase into MongoDB
    const result = await collection.insertOne(data);

    console.log(`Inserted data into MongoDB with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("Closed MongoDB connection");
  }
}

run().catch(console.error);
