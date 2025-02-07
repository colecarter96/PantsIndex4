import connect from "@/utils/startMongo";
import { ObjectId } from "mongodb";

export async function DELETE(request: Request) {
  try {
    const client = await connect;
    const { id } = await request.json();

    if (!id) {
      return Response.json({ success: false, error: "Invalid request" }, { status: 400 });
    }

    const db = client.db("pants-index-2");

    // Remove from pending collection
    await db.collection("pending-pants").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ success: true, message: "Pants deleted from pending list" });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to delete pants" }, { status: 500 });
  }
}
