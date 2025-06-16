# Booking App

A full stack booking system built with Next.js, MongoDB, Firebase, and Tailwind CSS. Users can register, log in, and book appointments

# Features

- User registration & login with Firebase Authentication
- Scheudle and view bookings stored in MongoDB
- Secure API routes for booking management
- MongoDB database integration wiht Mongoose
- Tailwind CSS styling for a smooth and responsive UI

# Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Firebase Auth
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Authentication (Email/Password & Google)

## Troubleshooting

### Error: Cannot find module './models/User'

**Cause:** Incorrect import path  
**Fix:** Update to `require('./src/models/User')`

### Bug: User emails saved with whitespace

**Cause:** Missing `.trim()` in schema  
**Fix:** Add `trim: true` to `email` and `name` fields in `User.js`

### `NavDropdown is not defined`

**Cause:**  
`NavDropdown` was used in the `Header` component but was not imported properly.

**Fix:**  
Added the correct import:

```js
import { NavDropdown } from "react-bootstrap";
```

### Troubleshooting: CastError: Cast to ObjectId failed

- If you hit a CastError like "Cast to ObjectId failed for value "..." (type string) at path "user" for model "Booking", it means Mongoose can't convert a string (like a Firebase UID) into a MongoDB ObjectId when it expects one.

**The Fix:**

Make sure you're always using the Mongoose \_id of the user document when you're creating or finding bookings. Don't use the Firebase UID string directly in fields defined as ObjectId in your Mongoose schemas.

Here's where to check in your src/server/controllers/bookingController.js:

createBooking: Use req.user.\_id (or req.user.id) for the user field.
getMyBookings: Query by req.user.\_id for the user field.

# Fixing CORS Error for Localhost and Netlify Frontend

## 🐛 Problem

When making requests from the React frontend running on `http://localhost:3000` (during development) or from the deployed frontend on Netlify (`https://bookiteasy.netlify.app`), the browser blocked the requests due to CORS (Cross-Origin Resource Sharing) policy.

### CORS Error Message:

Access to fetch at 'https://bookingapp-backend-67cv.onrender.com/' from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

fix: update CORS configuration to support multiple allowed origins

- Replaced hardcoded origin with dynamic list using `allowedOrigins` array
- Allowed requests from http://localhost:3000 and https://bookiteasy.netlify.app
- Simplified CORS middleware to improve readability and prevent origin mismatch issues
