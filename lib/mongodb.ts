import { MongoClient, Db } from 'mongodb';

// Replace the following with your MongoDB connection string
const MONGODB_URI = 'mongodb+srv://ersinaydinworks:lbG1cTk63InvZ8ig@nextjs-mongo-excel.angacza.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB = 'Product';

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI);

    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}