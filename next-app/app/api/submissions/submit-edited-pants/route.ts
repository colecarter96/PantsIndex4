import connect from "@/utils/startMongo";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const client = await connect;
    const { id, updatedPants } = await request.json();

    if (!id || !updatedPants) {
      return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    const db = client.db("pants-index-2");

    // Move to the main collection
    await db.collection("pants").insertOne(updatedPants);

    // Remove from pending collection
    await db.collection("pending-pants").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, message: "Pants submitted to database" });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to submit pants" }, { status: 500 });
  }
}
