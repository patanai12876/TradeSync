# Authentication Testing Guide 🚀

## Quick Start

### 1. Start the Backend
```bash
cd backend
npm install  # if first time
npm run start
```
Backend will run on `http://localhost:3001`

### 2. Start the Frontend
```bash
cd copytrading-website
npm install  # if first time
npm run dev
```
Frontend will run on `http://localhost:3000`

### 3. Test Authentication

#### Register a New User
1. Go to `http://localhost:3000/register`
2. Fill in:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Create Account"
4. Should be redirected to `/dashboard`
5. Check navbar - you should see "T" avatar (first letter of username)

#### Login with Existing User
1. Go to `http://localhost:3000/login`
2. Fill in:
   - Username: `testuser123`
   - Password: `password123`
3. Click "Login"
4. Should be redirected to `/dashboard`

#### Test Protected Routes
1. Clear localStorage: Open DevTools → Application → localStorage → clear
2. Try to access `http://localhost:3000/dashboard`
3. Should redirect to `http://localhost:3000/login`

#### Logout
1. Click on user avatar (letter circle) in navbar
2. Click "Logout" in dropdown
3. Should redirect to home page
4. "Login" and "Sign Up" buttons should appear in navbar

## Test Cases

### ✅ Valid Registration
- All fields filled correctly
- Passwords match
- Email valid format
- Should create account and login

### ✅ Valid Login
- Correct username
- Correct password
- Should login and redirect to dashboard

### ❌ Invalid Registration
- **Empty username**: Should show error
- **Empty email**: Should show error
- **Empty password**: Should show error
- **Passwords don't match**: Should show "Passwords do not match"
- **Password < 6 chars**: Should show error
- **Invalid email**: Should show error
- **Username already exists**: Should show error from backend

### ❌ Invalid Login
- **Wrong username**: Should show "User not found"
- **Wrong password**: Should show "Invalid password"
- **Empty fields**: Should show validation error

### 🔐 Protected Routes
- Access `/dashboard` without login → Redirects to `/login`
- After logout → Cannot access `/dashboard`
- After login → Can access `/dashboard`

## API Responses

### Register Response (Success)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "testuser123",
    "email": "test@example.com"
  }
}
```

### Login Response (Success)
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "testuser123",
    "email": "test@example.com"
  }
}
```

### Error Responses
```json
{
  "message": "User not found"
}
```

```json
{
  "message": "Invalid password"
}
```

## Browser DevTools Checks

### Check localStorage
1. Open DevTools (F12)
2. Go to Application tab → localStorage
3. You should see:
   - `authToken`: Some value (user ID)
   - `user`: JSON string with user data

### Check Network Tab
1. Open Network tab
2. Register or login
3. Look for POST request to:
   - `/users/register` or `/users/login`
4. Check Status: Should be `200` for success

## Common Issues

### "User not found"
- Check username is spelled correctly
- Check user was actually registered in database
- Clear localStorage and try registering again

### "Invalid password"
- Check password is correct (case-sensitive)
- Make sure you're using hashed password in DB

### Blank Page After Login
- Check browser console for errors
- Check Network tab for failed requests
- Verify backend is running on port 3001

### Not Redirecting to Dashboard
- Check if error occurred (check browser console)
- Clear localStorage and try again
- Refresh page

### Navbar Not Showing User
- Clear localStorage
- Refresh page
- Login again

## Debugging

### Check Auth State
Open browser console and run:
```javascript
JSON.parse(localStorage.getItem("user"))
localStorage.getItem("authToken")
```

### Monitor API Calls
1. Open Network tab in DevTools
2. Look at `/users/register` or `/users/login` requests
3. Check request body and response

### Check Component State
1. Install React DevTools extension
2. Look at useAuth hook values
3. Check user, loading, error states

## Notes

- Backend must be running on `http://localhost:3001`
- Frontend must be running on `http://localhost:3000`
- Passwords are hashed in backend with bcrypt
- localStorage stores auth data
- All API calls to backend use `NEXT_PUBLIC_API_URL` env variable
