// import connect from "@/utils/startMongo";
// import { ObjectId } from "mongodb";

// export async function GET(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.pathname.split("/").pop(); // Extract the `id` from the URL

//     if (!id) {
//       return new Response(
//         JSON.stringify({ message: "ID parameter is missing" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     if (!ObjectId.isValid(id)) {
//       return new Response(
//         JSON.stringify({ message: "Invalid ID format" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const client = await connect;
//     const pant = await client
//       .db("pants-index-2")
//       .collection("pants")
//       .findOne({ _id: new ObjectId(id) });

//     if (!pant) {
//       return new Response(
//         JSON.stringify({ message: "Pant not found" }),
//         { status: 404, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     return new Response(JSON.stringify(pant), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching pant details:", error);
//     return new Response(
//       JSON.stringify({ message: "An unexpected error occurred" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }


import connect from "@/utils/startMongo";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();

  if (!id || !ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ message: "Invalid or missing ID" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const client = await connect;
    const pant = await client
      .db("pants-index-2")
      .collection("pants")
      .findOne({ _id: new ObjectId(id) });

    if (!pant) {
      return new Response(
        JSON.stringify({ message: "Pant not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(pant), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ message: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
