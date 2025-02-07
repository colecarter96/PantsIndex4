import connect from "@/utils/startMongo";
import { ObjectId } from "mongodb";

export async function GET() {
    const client = await connect;
    const pants = await client.db("pants-index-2").collection("pending-pants").find().toArray();
    return Response.json(pants);
}


export async function POST(request: Request) {
  try {
    const client = await connect;
    const { id, status } = await request.json();

    if (!id || !["approved", "rejected"].includes(status)) {
      return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    const db = client.db("pants-index-2");
    const collection = db.collection("pending-pants");

    if (status === "approved") {
      // Move the approved item to the main collection
      const pendingItem = await collection.findOne({ _id: new ObjectId(id) });
      if (pendingItem) {
        await db.collection("approved-pants").insertOne(pendingItem);
        await collection.deleteOne({ _id: new ObjectId(id) });
      }
    } else {
      // Just remove rejected items
      await collection.deleteOne({ _id: new ObjectId(id) });
    }

    return Response.json({ success: true, message: `Pants ${status}` });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to update pants status" }, { status: 500 });
  }
}
