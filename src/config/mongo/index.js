import { MongoClient } from "mongodb";

const mongo = new MongoClient("mongodb://localhost:27017");

export default async function db() {
  console.log("aqui");
  await mongo.connect();
  return mongo.db('tweteroo')
}

