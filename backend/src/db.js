import { MongoClient } from "mongodb";

let db;

async function connectDb(cb) {
  const client = new MongoClient(
    "mongodb+srv://herexdevfullstack:hmCrFi5mczqI4pLZ@react.rl2zy.mongodb.net/?retryWrites=true&w=majority&appName=React"
  );
  await client.connect();

  db = client.db("mongodb-school-react");
  console.log("Connected to MongoDB:", db.databaseName);
  const collections = await db.listCollections().toArray();
  console.log("Collections in the database:", collections);

  cb();
}
export { db, connectDb };
