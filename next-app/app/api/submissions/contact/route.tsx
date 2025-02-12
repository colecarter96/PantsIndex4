import connect from "@/utils/startMongo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("Started contact form submission");
    
    const client = await connect;
    console.log("Connected to database");

    const formData = await request.json();
    console.log("Received form data:", formData);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Insert into "contact" collection
    await client.db("pants-index-2").collection("contact").insertOne(formData);
    console.log("Inserted into 'contact' collection");

    return NextResponse.json({ success: true, message: "Submission received!" });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
