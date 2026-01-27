# Day 1 — Simple guide for this project (Beginner friendly)

Welcome! This file helps you understand the project and get it running today. Follow the steps below.

---

## 1) What is this project?
- A small Express.js app that stores "listings" in MongoDB.
- The backend files are in the project root and `models/`.
- You can run a route that saves a sample listing to the database.

## 2) Key files (what they do)
- `app.js` — main Express server. Connects to MongoDB and exposes routes:
  - `GET /` - simple hello message
  - `GET /testlisting` - creates and saves a sample `Listing` document
- `models/listing.js` — Mongoose model (`Listing`) that defines the data shape.
- `init/index.js` — helper script to seed/initialize the database with sample data.
- `init/data.js` — seed data used by `init/index.js` (an array exported as `data`).
- `package.json` — project dependencies and scripts.

> When you see `Listing`, think of it like a record for a property (title, description, image, price, location, country).

## 3) Prerequisites (what you need installed)
- Node.js (v18+ recommended). You already have Node v24.
- npm (comes with Node).
- MongoDB server (mongod and mongosh) or MongoDB Compass (GUI).

If you do not have MongoDB, download and install MongoDB Community Server:
- https://www.mongodb.com/try/download/community

## 4) Step-by-step: get the project running (Windows, VS Code terminal)
1. Open a terminal in the project folder (example `D:\Airbnb`).

2. Install Node dependencies:
```powershell
cd D:\Airbnb
npm install
```

3. Start MongoDB server:
- If installed as a Windows service, open PowerShell (Admin) and run:
```powershell
Start-Service -Name MongoDB
```
- If you do not have it as a service, start `mongod` manually (example):
```powershell
# create the data folder once
mkdir C:\data\db
# run the server (adjust path if your install is in a different folder)
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath "C:\data\db" --bind_ip 127.0.0.1
```
Leave the mongod terminal open.

4. Start the Express app in another terminal:
```powershell
cd D:\Airbnb
node app.js
```
- You should see logs like `Connected to db` and `server is listening on port 8080`.

5. Save a sample listing:
- Open your browser and go to:
```
http://localhost:8080/testlisting
```
- Or use curl:
```powershell
curl http://localhost:8080/testlisting
```
- Response should say: `Listing saved successfully`.

## 5) Initialize or re-seed the DB (optional)
- If you want to clear and re-insert sample data, run the init script:
```powershell
cd D:\Airbnb\init
node index.js
```
- That script connects to MongoDB, deletes existing listings, and inserts seed data from `init/data.js`.

## 6) How to view data in MongoDB
- Using `mongosh` (shell):
```bash
mongosh "mongodb://127.0.0.1:27017"
# then in mongosh:
use wanderlust
show collections
db.listings.find().pretty()
```
- Using MongoDB Compass (GUI): connect to `mongodb://127.0.0.1:27017`, open `wanderlust` database and view the `listings` collection.

## 7) Common problems and quick fixes
- Error: `Cannot find module './data.js'`
  - Fix: Ensure `init/data.js` exists. Create it and export `{ data: [ ... ] }`.
- Error: `ValidationError: image: Cast to string failed ...`:
  - Cause: model expects a different shape than seed data. Fix by editing `models/listing.js` to match seed data (e.g., use an `image` subdocument) or change seed data to use a string URL.
- App cannot connect to DB:
  - Make sure `mongod` is running and listening on `127.0.0.1:27017`.
  - Check `mongo_url` in `app.js` is `mongodb://127.0.0.1:27017/wanderlust`.

## 8) Next small things to try (suggestions for Day 2)
- Add a new route that returns all listings: `GET /listings`.
- Add a simple `POST /listings` to create listings from JSON.
- Learn basic Mongoose queries: `Listing.find()`, `Listing.findById()`.

## 9) Notes for beginners (simple tips)
- Files you will edit first: `app.js` and `models/listing.js`.
- When you change the model, restart the Node server.
- Use the browser for quick checks and `mongosh` or Compass to inspect saved data.

---

If you want, I can also:
- Create `init/data.js` with sensible sample data for you.
- Add a `GET /listings` route in `app.js` so you can immediately see saved listings.

File created: `DAY1.md` in the project root.
