import connect from '@/utils/startMongo';

export async function GET(request: Request) {
  const client = await connect;
  const cursor = await client.db("pants-index-2").collection("pants").find();
  const greetings = await cursor.toArray();
  return Response.json(greetings);
}

export async function POST(request: Request){
  try {
    const client = await connect;
    const body = await request.json();

    const result = await client.db("pants-index-2").collection("pants").insertOne(body);

    return Response.json({success: true, id: result.insertedId});
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}