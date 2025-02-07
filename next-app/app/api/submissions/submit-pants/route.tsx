import connect from "@/utils/startMongo";

export async function POST(request: Request) {
  try {
    console.log("started");
    const client = await connect;
    // const db = client.db("pants-index-2");
    console.log("connected");
    const formData = await request.json();
    console.log("got data");
    // Add a status field to mark this as pending
    await client.db("pants-index-2").collection("pending-pants").insertOne(formData);
    console.log("inserted");
    return Response.json({ success: true, message: "Submission received!" });
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
