# productivity-tracker
This is a Chrome extension that tracks which websites you're visiting and how much time you spend on each one. If you stay on the same website for more than *2 minutes, it will show a **popup reminder* to keep you productive.

##  Features
- Tracks website usage time in the background.
- Automatically sends data to a MongoDB database using a Node.js server.
- Shows a notification popup after 2 minutes on any website.
- Stores data like:
  - Website (as task)
  - Time spent (in minutes)
  - URL
  - Date

## Technologies Used
- Chrome Extension APIs
- JavaScript
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (for real-time updates, optional)
- Make sure the server runs at http://localhost:5000.

## Chrome Extension Setup
1. Open Chrome → Extensions (chrome://extensions/)
2. Enable Developer Mode
3. Click Load unpacked
4. Select the extension/ folder from the project
5. Done ✅


## Data Example

Task	Duration (min)	URL	Date

Browsing YouTube	4	youtube.com	2025-07-05
Browsing GitHub	3	github.com	2025-07-05
