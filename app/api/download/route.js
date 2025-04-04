import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: "Missing file ID" }), { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", `${id}.txt`);

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ success: false, error: "File not found" }), { status: 404 });
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData); // Ensure this is valid JSON

    return new Response(JSON.stringify({ success: true, filename: data.filename, content: data.content }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), { status: 500 });
  }
}
