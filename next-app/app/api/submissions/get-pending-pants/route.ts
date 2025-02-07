import connect from "@/utils/startMongo";

export async function GET() {
  try {
    const client = await connect;
    const pants = await client.db("pants-index-2").collection("pending-pants").find().toArray();
    
    return Response.json({ success: true, pants });
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch pending pants" }, { status: 500 });
  }
}
