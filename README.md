# AI-Powered Client-Server Application

> **Note:** This is a temporary README. A comprehensive documentation will be created upon project completion.

## Overview

A full-stack application featuring AI integration with Google's Generative AI, built with Express.js backend and a client-side interface. The project implements Model Context Protocol (MCP) for enhanced AI interactions.

## Project Structure

```
├── Client/          # Frontend application
├── Server/          # Express.js backend
├── package.json     # Root dependencies
└── .env            # Environment variables (not tracked)
```

## Tech Stack

- **Backend**: Express.js
- **AI Integration**: Google Generative AI (@google/genai)
- **Protocol**: Model Context Protocol (MCP)
- **Validation**: Zod
- **Environment**: dotenv

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   cd Client && npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if available)
   - Add your Google AI API key and other required variables

3. **Run the application:**
   ```bash
   # Start server
   node Server/index.js
   
   # Start client (in another terminal)
   node Client/index.js
   ```

## Features

- AI-powered functionality using Google's Generative AI
- Client-server architecture
- Model Context Protocol implementation
- Environment-based configuration
- Input validation with Zod

## Development Status

🚧 **In Development** - This project is currently under active development.

## Environment Variables

Make sure to set up your `.env` file with the required API keys and configuration variables.

## Contributing

This project is currently in development. Detailed contribution guidelines will be provided upon completion.

---

*This README will be updated with comprehensive documentation, installation guides, and usage examples once the project is complete.*