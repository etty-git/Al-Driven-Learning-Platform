Installation instructions:
1-
git clone <repo-url>
cd project-name
2-
Installing hangers
Frontend:

cd client
npm install

Backend

cd server
npm install

In the server folder, create a file:  .env
server/.env
# Example .env file
adn Paste:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_API_KEY=your_api_key
PORT=7001

## 🔵 Running the Project

##  Running the server (Backend)
cd server
npm run dev

The server will run on:http://localhost:7001

## Running the Client (Frontend)

In a new terminal window:

cd client
npm start
The site will open at:

http://localhost:3000

## Notes
Make sure MongoDB is running or Atlas is configured correctly
Ensure .env file exists in the server folder before running backend
Backend must run before frontend for full functionality

## 🚀 Technologies Used

### Frontend
- React
- Redux Toolkit
- RTK Query
- React Router
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Axios (for AI API requests)

### External API
- OpenAI API (GPT-3.5 / GPT models)

##  Assumptions / Design Decisions

- Only admin users can manage or delete categories and sub-categories
- Regular users can view only their own prompt history
- Categories and sub-categories are stored in the database
- Users must log in before creating prompts
- JWT authentication is used for protected routes
- AI responses are generated using an external API
- Each prompt is connected to a category and sub-category
