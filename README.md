# Collaborative Task Manager Backend

This is the backend for the Collaborative Task Manager application. It is built with Node.js, Express, and TypeScript, and provides RESTful APIs for user authentication, task management, and image uploads.

## Features

- User registration and authentication (JWT-based)
- Role-based authorization
- Task CRUD operations
- Image upload and management
- Modular code structure with controllers, middleware, and routers

## Project Structure

```
Collaborative-task-manager-backend/
├── package.json
├── tsconfig.json
├── src/
│   ├── server.ts
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routers/
│   └── utils/
```

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Collaborative-task-manager-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your environment variables (e.g., MongoDB URI, JWT secret, ImageKit credentials).

### Running the Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

To build and run the production server:

```bash
npm run build
npm start
```

## API Endpoints

- **Auth**: `/api/auth` (register, login, logout)
- **Tasks**: `/api/tasks` (CRUD operations)
- **Users**: `/api/users` (user management)
- **Image Upload**: `/api/images` (upload and manage images)

## Folder Overview

- `src/config/` - Database and external service configuration
- `src/controllers/` - Business logic for each feature
- `src/middleware/` - Express middleware (auth, roles, image upload)
- `src/model/` - Mongoose schemas/models
- `src/routers/` - API route definitions
- `src/utils/` - Utility functions (token generation, image handling)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
