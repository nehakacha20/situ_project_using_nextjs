import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/bbcomponents/enquiry", "enquiry.json");

export async function POST(req: string) {
  try {
    const enquiryData = await req.json();

    let data = [];
    if (
      await fs
        .stat(filePath)
        .then(() => true)
        .catch(() => false)
    ) {
      const fileData = await fs.readFile(filePath, "utf8");
      data = JSON.parse(fileData);
    }

    data.push(enquiryData);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({ message: "Enquiry stored successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST enquiry data:", error);
    return new Response(
      JSON.stringify({
        message: "Error storing enquiry data",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: string) {
  try {
    if (
      await fs
        .stat(filePath)
        .then(() => true)
        .catch(() => false)
    ) {
      const fileData = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(fileData);
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: "No enquiries found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error in GET enquiry data:", error);
    return new Response(
      JSON.stringify({
        message: "Error reading enquiry data",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
