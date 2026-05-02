# Project Features & Routes

## Frontend Routes

### Public Routes
- `/` - Home page (list all animes)
- `/login` - Login page
- `/register` - Register page
- `/anime/:id` - Anime detail page with episodes list
- `/watch/:episodeId` - Video player with comments and likes

### Protected Routes (Login Required)
- `/watchlist` - User's anime watchlist
- `/history` - User's watch history with timestamps

### Admin Routes (Admin Role Required)
- `/admin/upload` - Create/upload new anime
- `/admin/upload-episode/:animeId` - Upload episode for anime

## Backend API Routes

### Authentication
```
POST /auth/register
POST /auth/login
```

### Animes (Public Read, Admin Write)
```
GET  /animes                    # List all animes
GET  /animes/:id               # Get anime with episodes
POST /animes                   # Create anime (admin)
PUT  /animes/:id               # Update anime (admin)
DELETE /animes/:id             # Delete anime (admin)
```

### Episodes (Public Read, Admin Write)
```
POST /animes/:id/episodes      # Upload episode (admin)
GET  /animes/episodes/:id      # Get episode details
DELETE /animes/episodes/:id    # Delete episode (admin)
```

### User Features (Auth Required)
```
# Watch History
GET  /user/watch-history       # Get user's watch history
POST /user/watch-history       # Save watch progress

# Likes
POST /user/episodes/:id/like   # Toggle like on episode
GET  /user/episodes/:id/likes  # Get like count

# Watchlist
POST /user/watchlist           # Add anime to watchlist
GET  /user/watchlist           # Get user's watchlist
DELETE /user/watchlist/:animeId # Remove from watchlist

# Comments
POST /user/episodes/:id/comments # Add comment
GET  /user/episodes/:id/comments # Get episode comments
```

## Database Models

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  username: String,
  password: String (hashed),
  role: String ('user' or 'admin'),
  createdAt: Date
}
```

### Anime
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  genre: [String],
  posterUrl: String,
  totalEpisodes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Episode
```javascript
{
  _id: ObjectId,
  animeId: ObjectId (ref: Anime),
  episodeNumber: Number,
  title: String,
  youtubeVideoId: String,
  description: String,
  uploadedAt: Date
}
```

### WatchHistory
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  episodeId: ObjectId (ref: Episode),
  animeId: ObjectId (ref: Anime),
  lastWatchedAt: Date,
  timeStampSeconds: Number,
  duration: Number
}
```

### Like
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  episodeId: ObjectId (ref: Episode),
  createdAt: Date
}
```

### Watchlist
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  animeId: ObjectId (ref: Anime),
  addedAt: Date
}
```

### Comment
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  episodeId: ObjectId (ref: Episode),
  content: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### Pages
- `Home.jsx` - Anime listing grid
- `Login.jsx` - User login form
- `Register.jsx` - User registration form
- `AnimeDetail.jsx` - Anime info and episodes list
- `Watch.jsx` - Video player with comments and likes
- `Watchlist.jsx` - User's watchlist
- `History.jsx` - Watch history with timestamps
- `AdminUpload.jsx` - Create/edit anime form
- `AdminUploadEpisode.jsx` - Upload episode form

### Context
- `AuthContext.jsx` - Global authentication state (user, token, login/logout)

### API Client
- `apiClient.js` - Axios instance with interceptors and API functions

### Utilities
- All API calls are centralized in `apiClient.js`
- Authentication token automatically added to requests
- Error handling built-in

## CSS Files
- `App.css` - Navbar styling
- `Home.css` - Anime grid styling
- `Auth.css` - Login/Register forms styling
- `AnimeDetail.css` - Anime page styling
- `Watch.css` - Video player page styling
- `AdminUpload.css` - Admin form styling
- `UserProfile.css` - Watchlist and History page styling
- `index.css` - Global styles

## Key Features Implemented

### ✅ User Authentication
- Registration with validation
- Login with JWT token
- Token stored in localStorage
- Automatic token refresh on requests
- Logout functionality

### ✅ Anime Management
- View all animes
- View anime details with episodes
- Admin can create animes
- Admin can edit animes
- Admin can delete animes
- Image poster support

### ✅ Episode Management
- Upload episodes with YouTube video IDs
- Display episodes by anime
- Play episodes using embedded YouTube
- Auto-save watch progress (every 10 seconds)
- Store watch timestamps

### ✅ User Interactions
- Like/unlike episodes
- View like count
- Add anime to watchlist
- Remove from watchlist
- Post comments on episodes
- View all comments on episodes
- Track watch history with timestamps

### ✅ Admin Panel
- Dedicated admin routes
- Role-based access control
- Anime upload form
- Episode upload form
- Delete functionality

## Security Features

- Passwords hashed with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Admin role verification
- Secure token storage (localStorage)
- CORS enabled
- Environment variables for sensitive data

## Responsive Design

- Mobile-first approach
- Grid layouts adapt to screen size
- Touch-friendly buttons
- Responsive navigation
- Works on desktop, tablet, mobile

## Performance Optimizations

- Lazy component loading with React Router
- Efficient API calls
- Watch progress saved in batches (10 second intervals)
- Image optimization with placeholders
- Minimized re-renders with context

## Error Handling

- Try-catch blocks in all API calls
- User-friendly error messages
- Fallback UI for missing data
- Loading states
- Empty state indicators
