# Course Management REST API

Advanced Computer Programming assignment by Syed Durr e Adan, SU92-BSCSM-F24-235.

## Setup
1. Install Node.js compatible with the locked dependencies (Node 22.12 or newer) and MongoDB Community Server.
2. Extract this project and open its folder in a terminal.
3. Run `npm ci` to install the locked dependencies.
4. Copy `.env.example` to `.env`. On Windows Command Prompt: `copy .env.example .env`.
5. Set MONGO_URI to your MongoDB connection string. The example uses a local database named acp_assignment. You can use your own database name.
6. Generate a JWT secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and put the output in JWT_SECRET in .env.
7. Ensure MongoDB is running, then run `node server.js`.
8. Test at http://localhost:5000 using Postman.

The database records are not included in this source-code ZIP. Register a user, log in, create a category, then create a course with the returned category ID. MongoDB creates the database/collections on the first write.

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST and GET /api/categories
- GET, PUT and DELETE /api/categories/:id
- POST and GET /api/courses
- GET, PUT and DELETE /api/courses/:id

Category and course routes require Authorization: Bearer <login-token>.
Category body: name and description.
Course body: title, description, price (a nonnegative number), category (an existing category ID).

## Submission
Submit the source ZIP (or a GitHub repository link) and the separate Postman evidence PDF. Keep .env and node_modules out of Git and the submission archive.

## Review status
All 12 endpoint implementations are present; all 14 JavaScript files passed syntax checks. Full database-backed CRUD testing was not performed during packaging. The original application code has been preserved.

Known limitation: deleting a category does not check for linked courses. Delete associated courses first to avoid dangling category references.
