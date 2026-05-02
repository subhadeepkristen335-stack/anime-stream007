# AnimeStream - Anime Streaming Platform

A full-stack anime streaming website where admins can upload animes and users can watch, comment, like, and track their viewing history.

## Features

### User Features
- ✅ Watch anime episodes with YouTube integration
- ✅ Watch history with timestamps
- ✅ Like/unlike episodes
- ✅ Add anime to personal watchlist
- ✅ Comment on episodes
- ✅ User authentication with JWT

### Admin Features
- ✅ Create and manage animes
- ✅ Upload episodes with YouTube video IDs
- ✅ Edit and delete anime entries
- ✅ Remove episodes

## Project Structure

```
new-animes/
├── backend/                 # Node.js Express server
│   ├── models/             # MongoDB schemas
│   ├── controllers/        # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth middleware
│   ├── server.js          # Express app entry
│   ├── .env               # Environment variables
│   └── package.json
└── frontend/              # React Vite app
    ├── src/
    │   ├── pages/         # Page components
    │   ├── components/    # Reusable components
    │   ├── context/       # React context (Auth)
    │   ├── api/          # API client utilities
    │   ├── App.jsx       # Main router
    │   ├── main.jsx      # Entry point
    │   └── App.css
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- Node.js 16+ and npm
- MongoDB running locally or remote connection string
- YouTube API credentials (for episode uploads)

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

Configure `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/anime-streaming
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
YOUTUBE_API_KEY=your_youtube_api_key_here
YOUTUBE_CLIENT_ID=your_youtube_client_id_here
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret_here
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

No configuration needed - the frontend communicates with the backend via proxy (see vite.config.js).

## Running the Application

### Start MongoDB

```bash
# Windows (if installed as service, it should auto-start)
# Or manually:
mongod

# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Start Backend

```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Animes
- `GET /animes` - Get all animes
- `GET /animes/:id` - Get anime details with episodes
- `POST /animes` - Create anime (admin only)
- `PUT /animes/:id` - Update anime (admin only)
- `DELETE /animes/:id` - Delete anime (admin only)

### Episodes
- `POST /animes/:id/episodes` - Upload episode (admin only)
- `GET /animes/episodes/:id` - Get episode details
- `DELETE /animes/episodes/:id` - Delete episode (admin only)

### User Features
- `GET /user/watch-history` - Get watch history
- `POST /user/watch-history` - Save watch progress
- `POST /user/episodes/:id/like` - Toggle like
- `GET /user/episodes/:id/likes` - Get like count
- `POST /user/watchlist` - Add to watchlist
- `GET /user/watchlist` - Get watchlist
- `DELETE /user/watchlist/:animeId` - Remove from watchlist
- `POST /user/episodes/:id/comments` - Add comment
- `GET /user/episodes/:id/comments` - Get comments

## User Roles

### Regular User
- Browse and watch animes
- Like episodes
- Add to watchlist
- Comment on episodes
- View watch history

### Admin User
- All user permissions +
- Create, edit, delete animes
- Upload episodes with YouTube videos
- Delete episodes

## Creating an Admin User

1. Register a new account normally
2. Update the user in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## YouTube Integration

### To upload unlisted videos to YouTube:

1. Get YouTube API credentials from [Google Cloud Console](https://console.cloud.google.com)
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials (Web application)
4. Add credentials to `.env` in backend

### Upload Process:
- Admin creates anime and uploads episodes
- Each episode requires a YouTube video ID (unlisted)
- Video ID extracted from URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Or use the format in URL: `https://youtu.be/VIDEO_ID`

To make a YouTube video unlisted:
1. Upload to YouTube
2. Go to Settings > Privacy
3. Select "Unlisted"
4. Copy the video ID and use in the admin panel

## Testing the App

### Create Test Data

1. **Register a regular user**
   - Email: user@example.com
   - Password: test123

2. **Create an admin user** (see "Creating an Admin User" section)
   - Email: admin@example.com
   - Password: admin123

3. **Add an anime** (as admin)
   - Title: "Attack on Titan"
   - Description: "A dark fantasy anime..."
   - Genres: Action, Adventure, Dark
   - Total Episodes: 4
   - Poster URL: https://via.placeholder.com/300x400

4. **Upload an episode** (as admin)
   - Episode Number: 1
   - Title: "To You, 2000 Years From Now"
   - YouTube Video ID: dQw4w9WgXcQ (example)

5. **Watch as regular user**
   - Browse to the anime
   - Click on episode
   - Watch video, add comment, like
   - Add anime to watchlist
   - Check watch history

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (change in production)
- `NODE_ENV` - Environment (development/production)
- `YOUTUBE_API_KEY` - YouTube API key (for future integration)

### Frontend
- Configure API base URL in `vite.config.js` proxy

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Default local: `mongodb://localhost:27017/anime-streaming`

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Change port in `package.json` dev script

### CORS Errors
- Check backend is running on `http://localhost:5000`
- Check frontend vite.config.js proxy configuration

### Authentication Issues
- Ensure JWT_SECRET is set in `.env`
- Check token is stored in localStorage
- Login again if token expired

## Future Enhancements

- [ ] YouTube API automatic upload integration
- [ ] Search and filtering
- [ ] Email notifications
- [ ] User ratings/reviews
- [ ] Series/seasons management
- [ ] Video download for offline viewing
- [ ] Advanced recommendations
- [ ] Social sharing features
- [ ] Dark mode
- [ ] Mobile app

## License

MIT
