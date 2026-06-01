import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import * as readline from "readline";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const EventSource = require("eventsource");

global.EventSource = EventSource;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });


async function main() {
  const token = process.env.N8N_MCP_TOKEN;
  let url = process.env.N8N_MCP_URL || "https://syllaboi-n8n-free.hf.space/mcp-server/http";

  if (!token) {
    process.stderr.write("Error: N8N_MCP_TOKEN environment variable is required\n");
    process.exit(1);
  }

  const transport = new SSEClientTransport(new URL(url), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // Forward messages from server to stdout
  transport.onmessage = (message) => {
    process.stdout.write(JSON.stringify(message) + "\n");
  };

  transport.onerror = (error) => {
    process.stderr.write(`SSEClientTransport Error: ${error.message || error}\n`);
  };

  transport.onclose = () => {
    process.stderr.write("SSE connection closed by server.\n");
    process.exit(0);
  };

  try {
    await transport.start();
    process.stderr.write("Successfully connected to n8n MCP Server via SSE.\n");
  } catch (err) {
    process.stderr.write(`Failed to start transport: ${err.message}\n`);
    process.exit(1);
  }

  // Read from stdin (IDE) and forward to server
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on("line", async (line) => {
    if (!line.trim()) return;
    try {
      const message = JSON.parse(line);
      await transport.send(message);
    } catch (e) {
      process.stderr.write(`Failed to parse/send message: ${e.message}\n`);
    }
  });
}

main().catch(err => {
  process.stderr.write(`Fatal error: ${err.message}\n`);
  process.exit(1);
});
