# productivity-tracker
This is a Chrome extension that tracks which websites you're visiting and how much time you spend on each one. If you stay on the same website for more than *2 minutes, it will show a popup reminder to keep you productive.

## Table of content
- [Features](#features)
- [Technologies used](#technologies-used)
- [Chrome Extension Setup](#chrome-extension-setup)
- [Clone the repository](#clone-the-repository)
- [Setup backend](#setup-backend)
- [Setup frontend](#setup-frontend)
- [Data example](#data-example)
- [Screenshots](#screenshots)
- [Author](#author)
  
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

## Clone the repository
- git clone https://github.com/your-username/productivit-tracker.git
- cd productivit-tracker

## Setup backend
- cd server
- install npm
- node server.js

## Setup frontend
- cd client
- npm install
- npm start
- make sure MongoDB compass is running locally

## Data Example

Task	Duration (min)	URL	Date

Browsing YouTube	4	youtube.com	2025-07-05
Browsing GitHub	3	github.com	2025-07-05

# Screenshots
<img width="1751" height="624" alt="Screenshot 2025-07-19 173934" src="https://github.com/user-attachments/assets/f54f63ee-4df0-47db-8077-b1774c430d86" />

<img width="1867" height="596" alt="image" src="https://github.com/user-attachments/assets/073ab40f-a425-4df9-a345-35ba84adac44" />

## Author
- Kamali P
