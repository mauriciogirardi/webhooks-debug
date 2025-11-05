# Webhook Debug

A full-stack application for debugging and testing webhooks with a TypeScript API and React frontend.

## Project Structure

This is a monorepo containing:

- `api/` - Backend API server built with TypeScript
- `web/` - Frontend application built with React and Vite

## Technologies

### Backend (API)
- TypeScript
- Node.js
- Drizzle ORM
- Docker (for development)
- Biome (for linting/formatting)

### Frontend (Web)
- React
- TypeScript
- Vite
- Modern CSS

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Setup the API:
```bash
cd api
# Start the database using Docker
docker-compose up -d

# Run database migrations
pnpm run migrate
```

3. Start the development servers:

For the API:
```bash
cd api
pnpm run dev
```

For the web application:
```bash
cd web
pnpm run dev
```

## Usage

The application allows you to:
- Create and manage webhook endpoints
- View webhook request history
- Test and debug incoming webhooks
- Analyze webhook payloads

Visit `http://localhost:5173` to access the web interface after starting both the API and web servers.

## License

MIT