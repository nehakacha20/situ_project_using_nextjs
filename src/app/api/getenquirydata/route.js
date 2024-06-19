import { promises as fs } from "fs";
import path from "path";

export async function GET(req, res) {
  const filePath = path.join(process.cwd(), "src/app/bb/enquiry/enquiry.json");
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const enquiry = JSON.parse(fileData);
    return new Response(JSON.stringify(enquiry), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error reading enquiry data", error }),
      { status: 500 }
    );
  }
}
