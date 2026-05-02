# Quick Start Guide

## 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## 2. Start MongoDB

**Windows:**
- If MongoDB is installed as a service, it should auto-start
- Otherwise: Open Command Prompt and run `mongod`

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

## 3. Configure Backend

Create/update `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/anime-streaming
JWT_SECRET=super_secret_key_change_later
NODE_ENV=development
YOUTUBE_API_KEY=optional_for_now
YOUTUBE_CLIENT_ID=optional_for_now
YOUTUBE_CLIENT_SECRET=optional_for_now
```

## 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Backend running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:5173
```

## 5. Access the App

Open your browser and go to: **http://localhost:5173**

## 6. Create Test Accounts

### Regular User
- Click "Register"
- Email: `user@test.com`
- Username: `testuser`
- Password: `test123`

### Admin User
1. Register with:
   - Email: `admin@test.com`
   - Username: `admin`
   - Password: `admin123`

2. Make user admin in MongoDB:
   ```bash
   # Open MongoDB shell
   mongosh
   
   # Use the database
   use anime-streaming
   
   # Update the user
   db.users.updateOne(
     { email: "admin@test.com" },
     { $set: { role: "admin" } }
   )
   
   # Verify
   db.users.findOne({ email: "admin@test.com" })
   ```

## 7. Add Test Anime Data

1. Login as admin
2. Click "Upload Anime" in navbar
3. Fill in details:
   - **Title:** Attack on Titan
   - **Description:** Humans are hunted by giants called Titans
   - **Genres:** Action, Adventure, Dark
   - **Poster URL:** `https://via.placeholder.com/300x400?text=Attack+on+Titan`
   - **Total Episodes:** 4

4. Click "Create Anime"

## 8. Upload Test Episode

1. From anime detail page, click "Upload Episode" (if admin)
2. Fill in:
   - **Episode Number:** 1
   - **Title:** To You, 2000 Years From Now
   - **YouTube Video ID:** `dQw4w9WgXcQ` (example - this is the famous Rick Roll)
   - **Description:** First episode description

3. Click "Upload Episode"

## 9. Test Features

### As Regular User
- Go to home page
- Click on anime to see episodes
- Click episode to watch
- Add to watchlist
- Like the episode
- Leave a comment
- Check watch history

### As Admin
- Upload more animes
- Manage existing animes
- Upload episodes with real YouTube videos (optional)

## Useful YouTube Videos for Testing

**Get YouTube Video ID:**
- Watch any video on YouTube
- The URL will be: `https://www.youtube.com/watch?v=VIDEO_ID`
- Or shorter: `https://youtu.be/VIDEO_ID`

**Public Domain Videos to Test:**
- Big Buck Bunny: `aqz-KE-bpKQ`
- Sintel: `Fy0aCjnZfG8`
- Elephant's Dream: `gCsKlZ7XE_E`

## Troubleshooting

**MongoDB Connection Failed:**
- Make sure MongoDB is running
- Check if connection string is correct in .env

**Port 5000 already in use:**
- Change `PORT=5000` to `PORT=5001` in backend/.env

**Port 5173 already in use:**
- Vite will automatically use 5174, 5175, etc.

**Can't login:**
- Check if backend is running on terminal 1
- Verify .env has JWT_SECRET set

**Comments/Likes not working:**
- Make sure you're logged in
- Check browser console for errors
- Verify backend is running

## Next Steps

1. **Customize Styling:** Edit CSS files in `frontend/src/pages/`
2. **Add Real YouTube Integration:** Update backend with YouTube OAuth
3. **Deploy:** Use Heroku for backend, Vercel for frontend
4. **Add More Features:** See README.md for future enhancements

## Database Structure

```
Collections in anime-streaming:
├── users           (accounts)
├── animes          (anime metadata)
├── episodes        (individual episodes)
├── watchhistory    (viewing progress)
├── likes           (user likes)
├── watchlists      (user watchlists)
└── comments        (episode comments)
```

Happy streaming! 🎬
