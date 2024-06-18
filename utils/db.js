import MongoClient from "mongodb";

const DB_HOST = process.env('DB_HOST') || 'localhost';
const DB_PORT = process.env('DB_PORT') || 27017;
const DB_DATABASE = process.env('DB_DATABASE') || 'files_manager';
class DBClient {
  constructor() {
    this.url = `mongodb://${DB_HOST}:${DB_PORT}`;
    this.client = MongoClient(this.url);
    this.db = this.client.db(DB_DATABASE);
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = DBClient();
export default dbClient;
