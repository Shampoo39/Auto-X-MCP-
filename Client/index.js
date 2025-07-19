import { config } from 'dotenv';
config()
// Load environment variables from .env file

import readline  from 'readline/promises'
import { GoogleGenAI } from "@google/genai"
// Import the GoogleGenAI library to interact with Google's AI models
import {Client} from "@modelcontextprotocol/sdk/client/index.js"
import{SSEClientTransport} from "@modelcontextprotocol/sdk/client/sse.js"


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const mcpClient = new Client({
    transport: new SSEClientTransport({
       name: 'example-client',
        version: '1.0.0',
    })
});

const chatHistory = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

mcpClient.connect(new SSEClientTransport(new URL("http://localhost:3000/sse")))
  .then(async () => {


    
  })

async function chatloop() {
  const question = await rl.question('You:');

  chatHistory.push({
    role: 'user',
    parts: [
      {
        text: question,
        type: 'text'
      }
    ]
  })

  const response  = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: chatHistory
  })

  const responseText = response.candidates[0].content.parts[0].text;

  // #ADDED: store the model's answer in the history
  chatHistory.push({
    role: "model",
    parts: [
      {
        text: responseText,
        type: 'text'
      }
    ]
  })

  console.log(`AI: ${responseText}`);

  // #ADDED: make sure we schedule the next turn on the event loop
  setImmediate(chatloop);
};

chatloop();