// server.js  (plain JavaScript)
require('dotenv').config();          // optional, if you use env vars
const express = require('express');
const { randomUUID } = require('node:crypto');

const {
  McpServer,
} = require('@modelcontextprotocol/sdk/server/mcp.js');

const {
  StreamableHTTPServerTransport,
} = require('@modelcontextprotocol/sdk/server/streamableHttp.js');

const { isInitializeRequest } = require('@modelcontextprotocol/sdk/types.js');
import { z } from 'zod';

const app = express();
app.use(express.json());

server.tool(
    "addTwonumbers",
     "Adds two numbers together",
     {
        a: z.number(),
        b: z.number(),
     },
      async (arg) => {
        const { a, b } = arg;
        return [
            {
                text: `The sum of ${a} and ${b} is ${a + b}`,
                type: 'text'
            }
        ]
      }
);

// Map sessionId -> transport
const transports = {};

// --------------------------------------------------
// POST /mcp   (client → server)
// --------------------------------------------------
app.post('/mcp', async (req, res) => {
  const sessionId = req.headers['mcp-session-id'];
  let transport;

  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // new session
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => {
        transports[id] = transport;
      },
      // TODO: enableDnsRebindingProtection: true,
      // allowedHosts: ['127.0.0.1']
    });

    transport.onclose = () => {
      if (transport.sessionId) delete transports[transport.sessionId];
    };

    const server = new McpServer({
      name: 'example-server',
      version: '1.0.0',
    });

    // TODO: server.resource(...), server.tool(...), server.prompt(...)
    await server.connect(transport);
  } else {
    return res.status(400).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Bad Request: No valid session ID' },
      id: null,
    });
  }

  await transport.handleRequest(req, res, req.body);
});

// --------------------------------------------------
// Shared handler for GET (SSE) and DELETE
// --------------------------------------------------
async function handleSessionRequest(req, res) {
  const sessionId = req.headers['mcp-session-id'];
  if (!sessionId || !transports[sessionId]) {
    return res.status(400).send('Invalid or missing session ID');
  }
  await transports[sessionId].handleRequest(req, res);
}

app.get('/mcp', handleSessionRequest);
app.delete('/mcp', handleSessionRequest);

// --------------------------------------------------
// Start server
// --------------------------------------------------
app.listen(3000, () => console.log('MCP server listening on http://localhost:3000'));