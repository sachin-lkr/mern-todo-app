import { MongoClient } from "mongodb";

const url="mongodb+srv://sachin9973083181_db_user:deepakBabu@cluster0.emydykg.mongodb.net/?appName=Cluster0";
export const collectioName= "todo";
const dbname="node-project";
const client = new MongoClient(url);
export const connection=async()=>{
  const connect= await client.connect();
  return await connect.db(dbname);
}