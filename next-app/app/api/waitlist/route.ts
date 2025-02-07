import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { email, suggestion } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await client.connect();
    const db = client.db("pants-index-2");
    const collection = db.collection("waitlist-emails");

    await collection.insertOne({ email, suggestion, createdAt: new Date() });

    return NextResponse.json({ message: "Submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving to DB:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
