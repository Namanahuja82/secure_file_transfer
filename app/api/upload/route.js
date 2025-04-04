import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { filename, content } = await req.json(); // Parse JSON from request body
    const id = uuidv4();
    const filePath = path.join(process.cwd(), 'uploads');

    // Ensure upload folder exists
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    // Save encrypted file data
    fs.writeFileSync(path.join(filePath, `${id}.txt`), JSON.stringify({ filename, content }));

    return new Response(JSON.stringify({ success: true, id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
