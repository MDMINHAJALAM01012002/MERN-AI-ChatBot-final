import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
  try {
    console.log(process.env.MONGODB_URL);
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error.message);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
