import fs from "node:fs/promises";
import path from "node:path";

export async function getLegalMarkdown(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  return fs.readFile(filePath, "utf8");
}
