import connect from '@/utils/startMongo';

export async function GET(request: Request) {
  const client = await connect;
  const cursor = await client.db("pants-index-2").collection("pants").find();
  const greetings = await cursor.toArray();
  return Response.json(greetings);
}