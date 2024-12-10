import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'visitorCount.json');

export async function GET(request) {
  // Read the visitor count from the JSON file
  const data = fs.readFileSync(filePath);
  const json = JSON.parse(data);
  return new Response(JSON.stringify({ count: json.count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  // Read the current count
  const data = fs.readFileSync(filePath);
  const json = JSON.parse(data);
  
  // Increment the count
  json.count += 1;
  
  // Write the updated count back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(json));
  
  return new Response(JSON.stringify({ count: json.count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}